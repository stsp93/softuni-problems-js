import { html,render } from "../lib.js"
import { create } from "../api/data.js"

const createTemplate = (data = {}) => html`<div class="row space-top">
<div class="col-md-12">
    <h1>Create New Furniture</h1>
    <p>Please fill all fields.</p>
</div>
</div>
<form  @submit=${onCreate}>
<div class="row space-top">
    <div class="col-md-4">
    <div class="form-group">
        <label class="form-control-label" for="new-make">Make</label>
        <input class="form-control ${data.make? 'is-valid':'is-invalid'}" id="new-make" type="text" name="make">
    </div>
    <div class="form-group has-success">
        <label class="form-control-label" for="new-model">Model</label>
        <input class="form-control ${data.model? 'is-valid':'is-invalid'}" id="new-model" type="text" name="model">
    </div>
    <div class="form-group has-danger">
        <label class="form-control-label" for="new-year">Year</label>
        <input class="form-control ${data.year? 'is-valid':'is-invalid'}" id="new-year" type="number" name="year">
    </div>
    <div class="form-group">
        <label class="form-control-label" for="new-description">Description</label>
        <input class="form-control ${data.description? 'is-valid':'is-invalid'}" id="new-description" type="text" name="description">
    </div>
</div>
<div class="col-md-4">
    <div class="form-group">
        <label class="form-control-label" for="new-price">Price</label>
        <input class="form-control ${data.price? 'is-valid':'is-invalid'}" id="new-price" type="number" name="price">
    </div>
    <div class="form-group">
        <label class="form-control-label" for="new-image">Image</label>
        <input class="form-control ${data.img? 'is-valid':'is-invalid'}" id="new-image" type="text" name="img">
    </div>
    <div class="form-group">
        <label class="form-control-label" for="new-material">Material (optional)</label>
        <input class="form-control" id="new-material" type="text" name="material">
    </div>
    <input type="submit" class="btn btn-primary" value="Create" />
</div>
</div>
</form>`


let context;

export function showCreate(ctx,next) {
    context = ctx
    ctx.navActive('createLink');
    ctx.render(createTemplate());
}

async function onCreate(ev) {
    ev.preventDefault();

    
    const formData = new FormData(ev.target)

    const createData = Object.fromEntries(formData);
    if(createData.make.length < 4) createData.make = false;
    if(createData.year < 1950 || createData.year >2050) createData.year = false;
    if(createData.description.length < 11) createData.description = false;
    if(createData.price < 1) createData.price = false;
    if(createData.img === '') createData.img = false;

    if(Object.values(createData).some(f => f === false)) {
        context.render(createTemplate(createData))
        return;
    }



    const data =await create(createData);

    context.page.redirect('/index');

}