/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navBar = document.querySelector("#navbar__list");
const sectionList = document.querySelectorAll("Section");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
//Helper funciton to remove the 'your-active-class' to and element
const removeSectionActiveStatus=(el)=>{
    el.classList.remove('your-active-class');
}

//Helper funciton to add the 'your-active-class' to and element
const addSectionActiveStatus=(el)=>{
    el.classList.add('your-active-class');
}

//Helper method to check if an element is in the view port
const isInVeiewPort = (el) => {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

//Helper function to toggle the navActive class based on the value of the herf attribute
const menuItemActiveToggle = (hrefatt) => {
    const menuAnchorList = document.querySelectorAll('.navbar__menu .menu__link');
    
    for (const menuAnchor of menuAnchorList){
        menuAnchor.classList.remove('navActive');
        if (`#${hrefatt}`=== menuAnchor.getAttribute('href')||hrefatt === menuAnchor.getAttribute('href')){
            menuAnchor.classList.add('navActive');
        }
    }
}

// Handle Back to top button
const showAndHideBackToTopButton = () => {
    const backToTopBtn = document.querySelector("#backToTop");

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}

const backToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const navbarBuild = () => {
    //Creating docment Fragment to append the nav menu to it
    const fragment = document.createDocumentFragment();
    //Creating Home item in menu
    const homeitem = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.className = "menu__link";
    anchor.setAttribute('href', "#navbar__list");
    anchor.textContent="Home";
    homeitem.appendChild(anchor);
    fragment.appendChild(homeitem);
    //Adding the onclick event to the home item
    const mainElment = document.querySelector('.main__hero');
    anchor.addEventListener('click', (e)=>{
        e.preventDefault();
        mainElment.scrollIntoView({
            behavior: "smooth", 
            block: "end", 
            inline: "nearest"});
        });
    //Adding and menu item for each section
    for (const section of sectionList){
        let sectextcontent = section.querySelector('div h2').textContent;
        let sectionId = section.getAttribute('id');
        let item = document.createElement('li');
        let anchor = document.createElement("a");
        
        anchor.setAttribute('href', `#${sectionId}`);
        anchor.classList.add("menu__link");
        anchor.textContent=sectextcontent;
        
        // Add event listenr to evey menu item to scroll smoothly on link click 
        anchor.addEventListener('click', (e)=>{
        e.preventDefault();
        section.scrollIntoView({
            behavior: "smooth", 
            block: "end", 
            inline: "nearest"})
        });
        //appending the anchor item to the li element
        item.appendChild(anchor);
        //appending the li item to the document fragment
        fragment.appendChild(item);
    }
    //appending the document fragment containing the whole menu items to the ul element
    navBar.appendChild(fragment);
}

/**
 * End Main Functions
 * Begin Events
 * 
*/
/**
* this function removes the 'your-active-class' for each section using the helper function removeSectionActiveStatus
* then check if the h2 element of each seciton is in viewport.
* if it is in the viewport then add the class 'your-active-class' to section and store the section id into activeId variable
* after looping on all sections, using the menuItemActiveToggle, we toggle the navActive class to the anchor element whose href element is set  * the id of the section element that is in the viewport
*/
const activeToggle = ()=>{
    showAndHideBackToTopButton();
    let activeId = "";
    const mainElment = document.querySelector('.main__hero');
    if (isInVeiewPort(mainElment)) activeId = "#navbar__list";
    else {
        for (const section of sectionList){
            removeSectionActiveStatus(section);
            if (isInVeiewPort(section.firstElementChild.firstElementChild)){
                addSectionActiveStatus(section);
                activeId=section.id;
            }
        }
    }
    menuItemActiveToggle(activeId);
}
/**
 * Function calling  
 * 
*/
// Build menu 
navbarBuild();
// Set sections as active on scroll using the funciton activeToggle

let didScroll = false;
window.addEventListener('scroll', function(event) {
    if (event) {
        
        didScroll = true;
        
        activeToggle();
        
        navBar.style.display = "flex";
        
        setTimeout(() =>{
            if (didScroll){
                navBar.style.display = "none";
            }
        }, 8000);
    }
 
});
