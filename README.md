# Landing Page Project

## Table of Contents
** [Global Variables]

** [Helper functions]
* removeSectionActiveStatus(el)
* addSectionActiveStatus(el)
* isInVeiewPort(el)
* menuItemActiveToggle(hrefatt)
* showAndHideBackToTopButton();
** [Main Functions]
* navbarBuild()

** [Begin Events]
*activeToggle();

**[Function calling]
## Instructions
** [Global Variables]
First I created 2 global vriables:
    1) navBar which select the ul element whose id is "#navbar__list"
    2) sectionList which contains and array of all sections in the index.html
** [Helper functions]
Second, I crreated some helper functions:
    1) removeSectionActiveStatus(el): this function takes an element as a parameter and remove the class "your-active-class"
    2) addSectionActiveStatus(el): this function takes an element as a parameter and add the class "your-active-class"
    3) isInVeiewPort(el): this function takes an element as a parameter and return true if the element is shown in the viewport and false otherwise.
    4) menuItemActiveToggle(hrefatt): this function takes a string representing the href value of the anchor elements of the nav menu. It creates an anchor list and loop over all anchor elements and for each element it removes the navActive class first then it checks if the value of href attribute equals the hrefatt parameter and if so, it add the navActive class.
    5) showAndHideBackToTopButton() : this function show/hide a backToTop button if the page is scrolled down;
    
** [Main Functions]
Third, I created the navbarBuild() which bulid the navbar. This function works in the follloing steps:
    1) creates a document fragment
    2) Creating an "li" element for the Home menu item.
    3) Adding onClick event listener to scroll to top on link click 
    4) looping over the sectionList and extracting the section title form the h2 element and the Section id and creating an li and anchor element for each element and then append it to the document fragment.
    5) Finally, after the loop ends, we append the document fragment to the ul navBar element (i.e. the ul element whose id = "#navbar__list").

** [Begin Events]
Fourth, I created the activeToggle() function that is used for toggling the "your-active-class" class for any section found on the viewport and the navActive class for menu items if the section in the viewport;
This function works as follow:
    1) call the helper function showAndHideBackToTopButton() to show the backToTop button if the page is scrolled.
    2) Creaing activeId variable storeing empty string.
    3) Storing the header element of the main section in a variable named mainElment.
    4) check if the mainElment in the viewport. if so, set the activeId to "#navbar__list" to use it in step (6)
    5) else if it is not the view port, it Loops over the sectionList and for each section it:
        a) removes the "your-active-class" class using the helper function removeSectionActiveStatus(el).
        b) Check if the section found in the viewport. if so, it adds the "your-active-class" and set the activeId to the section.id
    6) finally, it uses the activeId and toggle the navActive class of the anchor element whose href attribute is set to the activeId. This is done by using the helper function menuItemActiveToggle.

**[Function calling]
Finally, I called the navbarBuild(); to build and navbar then adding onScroll event listener to the window object to execute the function activeToggle on window scrolling and hide the menu if the window is not scrolling.