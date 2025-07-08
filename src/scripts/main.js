window.addEventListener('DOMContentLoaded', ()=> {
    // const openModalBtns = document.querySelectorAll('.card__btn');
    const modal = document.querySelector('.modal');
    window.addEventListener('click',e=>{
        if(e.target.closest('.card__btn')){
            modal.classList.add('active');
            document.body.classList.add('fixed');
        }
        if(e.target.closest('.modal__overlay')|| e.target.closest('.modal__close') || e.target.closest('.modal__btn')){
            modal.classList.remove('active');
            document.body.classList.remove('fixed');
        }
    })
})