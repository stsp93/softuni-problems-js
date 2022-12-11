import { logout } from "./api/user.js";
import { page } from "./lib.js";
import { decoratorCtx } from "./middleware.js";
import { showNav } from "./views/nav.js";
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showHome } from './views/home.js';
import { showProfile } from './views/profile.js';
import { showEdit } from './views/edit.js';
import { showDetails } from './views/details.js';
import { showCreate } from './views/create.js';



page(decoratorCtx)
page(showNav);
page('/', showHome)
page('/logout', onLogout)
page('/login', showLogin)
page('/register', showRegister)
page('/profile', showProfile)
page('/edit/:id', showEdit)
page('/details/:id', showDetails)
page('/register', showRegister)
page('/create', showCreate)


page.start();

async function onLogout(ctx, next) {
    const res = await logout();
    ctx.page.redirect('/')

    return res
}