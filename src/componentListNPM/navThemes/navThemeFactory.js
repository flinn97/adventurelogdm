// import DefaultSideNav from "./defaultSideBar";
// import DefaultTopNav from "./defaultTopBar";


class NavThemeFactory {
    operationsFactory;

    factory ={
    //     defaultSideNav: DefaultSideNav.getNavTheme(),
    //    defaultTopNav: DefaultTopNav.getNavTheme(),

    }

    registerComponents(register){
        this.factory[register.name]= register.component;
    }
    getNavThemeFactory(){
        return this.factory;
    }

   
}
export default NavThemeFactory;