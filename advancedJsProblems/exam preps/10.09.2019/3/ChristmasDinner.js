class ChristmasDinner {
    constructor(budget) {
        
        this.budget = budget;
        this.dishes = [];
        this.products = [];
        this.guests = {};
    }
    set budget (budget) {
        if (+budget < 0) {
            throw new Error("The budget cannot be a negative number");
        }
        this._budget = +budget
    }

    get budget (){
        return this._budget;
    }

    shopping(product) {
        const type = product[0]
        const price = +product[1];
        if (price > this.budget) {
            throw new Error("Not enough money to buy this product");
        }
        this.budget -= price;
        this.products.push(type);
        return `You have successfully bought ${type}!`
    }

    recipes(recipe) {
        const { recipeName, productsList } = recipe;
        for (let product of productsList) {
            if (!this.products.includes(product)) throw new Error("We do not have this product");
        }

        this.dishes.push({ recipeName, productsList });
        return `${recipeName} has been successfully cooked!`
    }

    inviteGuests(name, dish) {
        if (!this.dishes.some(d => d.recipeName === dish)) throw new Error("We do not have this dish");

        if (Object.keys(this.guests).includes(name)) throw new Error("This guest has already been invited");

        this.guests[name] = dish;

        return `You have successfully invited ${name}!`
    }

    showAttendance() {
        let output = [];
        for (let [guest, dish] of Object.entries(this.guests)) {
            let products;
            this.dishes.forEach(d => {
                if (d.recipeName === dish) {
                    products = d.productsList;
                }
            })
            output.push(`${guest} will eat ${dish}, which consists of ${products.join(', ')}`);
        }
        return output.join('\n');
    }
}


let dinner = new ChristmasDinner(300);

dinner.shopping(['Salt', 1]);
dinner.shopping(['Beans', 3]);
dinner.shopping(['Cabbage', 4]);
dinner.shopping(['Rice', 2]);
dinner.shopping(['Savory', 1]);
dinner.shopping(['Peppers', 1]);
dinner.shopping(['Fruits', 40]);
dinner.shopping(['Honey', 10]);

dinner.recipes({
    recipeName: 'Oshav',
    productsList: ['Fruits', 'Honey']
});
dinner.recipes({
    recipeName: 'Folded cabbage leaves filled with rice',
    productsList: ['Cabbage', 'Rice', 'Salt', 'Savory']
});
dinner.recipes({
    recipeName: 'Peppers filled with beans',
    productsList: ['Beans', 'Peppers', 'Salt']
});

dinner.inviteGuests('Ivan', 'Oshav');
dinner.inviteGuests('Petar', 'Folded cabbage leaves filled with rice');
dinner.inviteGuests('Georgi', 'Peppers filled with beans');

console.log(dinner.showAttendance());
