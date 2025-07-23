"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convFlow = void 0;
exports.convFlow = [
    {
        id: "greetings",
        response: {
            messages: ["Welcome to our restaurant! What would you like to order?"],
            options: [
                { state: "pizza_crust", display: "Pizza" },
                { state: "pasta_sauce", display: "Pasta" },
                { state: "salad_dressing", display: "Salad" },
            ],
        },
    },
    {
        id: "pizza_crust",
        response: {
            messages: ["Excellent! What kind of crust would you prefer for your Pizza?"],
            options: [
                { state: "payment", display: "Thin Crust" },
                { state: "payment", display: "Thick Crust" },
            ],
        },
    },
    {
        id: "pasta_sauce",
        response: {
            messages: ["Great! Which sauce would you like with your Pasta?"],
            options: [
                { state: "payment", display: "Marinara" },
                { state: "payment", display: "Alfredo" },
                { state: "payment", display: "Pesto" },
            ],
        },
    },
    {
        id: "salad_dressing",
        response: {
            messages: ["A healthy choice! What kind of dressing would you like?"],
            options: [
                { state: "payment", display: "Vinaigrette" },
                { state: "payment", display: "Caesar" },
            ],
        },
    },
    {
        id: "payment",
        response: {
            messages: ["How would you like to pay?"],
            options: [
                { state: "end", display: "Credit Card" },
                { state: "end", display: "Cash" },
                { state: "end", display: "Mobile Pay" },
            ],
        },
    },
    {
        id: "end",
        response: {
            messages: ["Thank you for your order! It will be ready shortly."],
            options: [],
        },
    }
];
//# sourceMappingURL=const.js.map