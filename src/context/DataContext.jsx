import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { useAuth } from './AuthContext';
import {
    collection,
    query,
    where,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [expenses, setExpenses] = useState([]);
    const [budget, setBudget] = useState({
        limit: 2000,
        categories: {
            Food: 500,
            Transport: 200,
            Rent: 800,
            Shopping: 300,
            Subscriptions: 100,
            Education: 0,
            Entertainment: 100,
            Others: 0
        }
    });

    // Real-time listener for user data
    useEffect(() => {
        if (!currentUser) {
            setExpenses([]);
            return;
        }

        // Fetch User's Custom Budget (Optional feature, defaults to state above)
        const fetchBudget = async () => {
            try {
                const budgetRef = doc(db, 'budgets', currentUser.uid);
                const budgetDoc = await getDoc(budgetRef);
                if (budgetDoc.exists()) {
                    setBudget(budgetDoc.data());
                }
            } catch (err) {
                console.error("Failed to fetch budget:", err);
            }
        };
        fetchBudget();

        // Listen to User's Expenses
        const q = query(
            collection(db, 'expenses'),
            where('userId', '==', currentUser.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const expensesData = [];
            snapshot.forEach((docSnap) => {
                expensesData.push({ id: docSnap.id, ...docSnap.data() });
            });
            // Sort expenses by date descending
            expensesData.sort((a, b) => new Date(b.date) - new Date(a.date));
            setExpenses(expensesData);
        }, (error) => {
            console.error("Error listening to expenses:", error);
        });

        return () => unsubscribe();
    }, [currentUser]);

    const addExpense = async (expense) => {
        if (!currentUser) return;
        try {
            await addDoc(collection(db, 'expenses'), {
                ...expense,
                userId: currentUser.uid,
                createdAt: new Date().toISOString()
            });
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    const deleteExpense = async (id) => {
        if (!currentUser) return;
        try {
            await deleteDoc(doc(db, 'expenses', id));
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    const updateBudget = async (newLimit, newCategories) => {
        if (!currentUser) return;
        const newBudget = {
            limit: newLimit,
            categories: newCategories
        };
        try {
            await setDoc(doc(db, 'budgets', currentUser.uid), newBudget);
            setBudget(newBudget);
        } catch (error) {
            console.error("Error updating budget:", error);
        }
    };

    const value = {
        expenses,
        budget,
        addExpense,
        deleteExpense,
        updateBudget
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};
