const modal = document.querySelector('.modal');
const previews = document.querySelectorAll('.blog-gallery img');

previews.forEach(preview =>{
    preview.addEventListener('click', () =>{
        modal.classList.add('open');
    });
});

modal.addEventListener('click', (event) =>{
    if(event.target.classList.contains('modal')){
        modal.classList.remove('open');
    }
});