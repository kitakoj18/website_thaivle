// script that is linked to thoughts.ejs

const images = document.querySelectorAll(".blog-gallery img");

// in thoughts.ejs, a special id is added to each img element
// and the same id is added as a class to the corresponding modal

images.forEach(image =>{
    image.addEventListener('click', () =>{

        // get special id name from image
        // select modal with same attribute name and add 'open' class to it
        const blogId = image.getAttribute("id");
        const classSelection = ".modal." + blogId;
        const modal = document.querySelector(classSelection);

        modal.classList.add('open');
        modal.addEventListener('click', (event) =>{
            if(event.target.classList.contains('modal')){
                modal.classList.remove('open');
                modal.removeEventListener('click');
            }
        });

    });
});
