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
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */


/**
 * End Global Variables
 * Start Helper Functions
 *
 */


/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// Section Class
class SectionItem {

    newId = 1 // section index
    // getting dummy section
    get htmlContent() {
        return `<section id="section${this.newId}" data-nav="Section ${this.newId}" class="your-active-class">
      <div class="landing__container">
        <h2>Section ${this.newId} <span onclick="section.remove('section${this.newId}')" style="cursor: pointer; font-weight: lighter; font-size: smaller"><small>| X |</small></span></h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

        <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
      </div>
    </section>`
    }

    add() {
        /** add new section **/
        document.getElementsByTagName('main')[0].insertAdjacentHTML('beforeend', this.htmlContent)
        this.newId += 1
    }

    remove(sectionId) {
        /** remove section  by it's id **/
        document.getElementById(sectionId).remove()
        navBar.create()
    }
}

class NavBar {
    /** class responsible for NavBar  **/

    menu = document.getElementById('navbar__list')

    empty() {
        /** empty all the populated items   **/

        this.menu.innerHTML = ''
    }

    create() {
        /** create items based on section  **/

        this.empty()
        let sectionNavElements = document.querySelectorAll('section');
        sectionNavElements.forEach((section) => {
            this.menu.insertAdjacentHTML('beforeend', `<li><a href='#${section.id}' class='menu__link' data-section-id=${section.id}>${section.dataset.nav}</a> </li>`);
        })
        this.goToSection()
    }

    goToSection() {
        /** navigate to section area **/

        this.menu.addEventListener('click', (event) => {
            const targetSection = event.target.dataset.sectionId // get pressed Item
            event.preventDefault()
            document.getElementById(targetSection).scrollIntoView({behavior: "smooth"})
            addActiveClass(targetSection)
        })
    }

}

/** Global Variables **/
const section = new SectionItem()
const navBar = new NavBar()
const goToTopButton = document.getElementById('goToTopButton')


// Add class 'active' to section when near top of viewport
// Scroll to anchor ID using scrollTO event


function addActiveClass(sectionId) {
    /** adding active class for section and it's item in the nav menu **/

    const sectionContainer = document.getElementById(`${sectionId}`)

    const navItem = document.querySelector(`[href='#${sectionId}']`)
    document.querySelector('.menu__item__active')?.classList.remove('menu__item__active')
    document.querySelector('.your-active-class')?.classList.remove('your-active-class')
    sectionContainer.classList.add('your-active-class')
    navItem.classList.add('menu__item__active')
    // update window location based on section id
    setTimeout(() => {
        window.location.hash = sectionId
    }, 0)

}

// When the user scrolls down 300 from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        goToTopButton.style.display = "block"; // show
    } else {
        goToTopButton.style.display = "none"; // hide
    }

    document.querySelectorAll('section').forEach(element => {
        if (isSectionOnScreen(element, -300)) {
            addActiveClass(element.id)
        }

    })
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu 

// Scroll to section on link click

// Set sections as active


function addNewSection(navigate = false) {
    /** adding new section then navigate to it **/

    section.add()
    navBar.create()
    if (navigate) {
        setTimeout(() => {
            window.location.hash = `#section${section.newId - 1}`
        }, 0)
    }
}

function goToTop() {
    goToTopButton.addEventListener('click', () => {
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    })
}

function isSectionOnScreen(element, buffer) {
    /** return true if the current window is on section element or not with buffer value **/

    buffer = typeof buffer == 'undefined' ? 0 : buffer
    const bounding = element.getBoundingClientRect()
    return bounding.top >= buffer &&
        bounding.left >= buffer &&
        bounding.right <= ((window.innerWidth || document.documentElement.clientWidth) - buffer) &&
        bounding.bottom <= ((window.innerHeight || document.documentElement.clientHeight) - buffer);

}


addNewSection()
addNewSection()
addNewSection()
addNewSection()

goToTop()