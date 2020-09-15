// const modal = document.querySelector('.modal');
console.log('hey');
const previews = document.querySelectorAll(".blog-gallery img");
console.log(previews);
console.log('hello')

// add a special attribute to each img element in thoughts.ejs
// add same attribute to corresponding modal 

previews.forEach(preview =>{
    preview.addEventListener('click', () =>{

        console.log('hi');

        // get special attribute name from preview
        // select modal with same attribute name and add 'open' class to it
        const blogId = preview.getAttribute("id");
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

// modal.addEventListener('click', (event) =>{
//     if(event.target.classList.contains('modal')){
//         modal.classList.remove('open');
//     }
// });