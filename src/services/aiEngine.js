// aiEngine.js
// A rule-based engine simulating AI financial analysis

export const analyzeFinances = (expenses, budget) => {
    const insights = [];
    const totalSpend = expenses.reduce((sum, item) => sum + item.amount, 0);
    const totalBudget = budget.limit;

    // Rule 1: Calculate savings ratio
    const savingsRatio = ((totalBudget - totalSpend) / totalBudget) * 100;

    if (savingsRatio >= 20) {
        insights.push({
            type: 'success',
            title: 'Excellent Savings Rate',
            message: `You are saving ${savingsRatio.toFixed(1)}% of your budget. Keep up the phenomenal work!`
        });
    } else if (savingsRatio < 5 && savingsRatio >= 0) {
        insights.push({
            type: 'warning',
            title: 'Low Savings Warning',
            message: `Your savings ratio is critically low at ${savingsRatio.toFixed(1)}%. Try to cut down discretionary spending.`
        });
    } else if (savingsRatio < 0) {
        insights.push({
            type: 'danger',
            title: 'Budget Exceeded',
            message: 'You are currently spending beyond your set budget limit. Focus on essentials immediately.'
        });
    }

    // Rule 2: Detect overspending in categories (>40% of income/budget)
    const categoryTotals = {};
    expenses.forEach(e => {
        categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });

    Object.entries(categoryTotals).forEach(([category, amount]) => {
        const categoryPercentage = (amount / totalBudget) * 100;
        if (categoryPercentage > 40 && category !== 'Rent') {
            insights.push({
                type: 'danger',
                title: `High ${category} Spending`,
                message: `You are spending ${categoryPercentage.toFixed(1)}% of your total budget on ${category}. Consider reducing this to improve financial health.`
            });
        }

        // Checking against categorical budget limits
        if (budget.categories[category] && amount > budget.categories[category] * 0.9) {
            insights.push({
                type: 'warning',
                title: `${category} Budget Alert`,
                message: `You have consumed ${(amount / budget.categories[category] * 100).toFixed(0)}% of your ${category} budget.`
            });
        }
    });

    // Rule 3: High Subscription detection
    const subscriptionTotal = categoryTotals['Subscriptions'] || 0;
    if (subscriptionTotal > 150) {
        insights.push({
            type: 'warning',
            title: 'Subscription Overload',
            message: `You spent ₹${subscriptionTotal} on Subscriptions. Audit your recurring payments for unused services.`
        });
    }

    return insights;
};


