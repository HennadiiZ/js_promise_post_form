// FETCH API + PROMISE 

// just rewriting XMLHttpRequest FETCH API + PROMISE 

const btns = document.querySelectorAll('[data-modal]');
const modal = document.querySelector('.modal');

function modalOpen(){
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
};

function modalClose(){
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
};

btns.forEach((btn, i)=>{
    btn.addEventListener('click',modalOpen)
});

modal.addEventListener('click',(e)=>{
    // if(e.target.classList.contains('modal') || e.target.getAttribute('modal__close')){
        if(e.target.classList.contains('modal') || e.target.classList.contains('modal__close')){
        modalClose()
    }
});
document.addEventListener('keydown',(e)=>{

    if(e.code === 'Escape'){
        modalClose()
    }
});

//================================================================================================================================

const forms = document.querySelectorAll('form');

const message = {
    loading: 'img/spinner.svg',
    success: 'Thank you! We will contact you shortly!',
    failure: 'Something went wrong...'
};

forms.forEach(item => {
    postData(item);
});

function postData(form){
    form.addEventListener('submit', (e)=> {
        e.preventDefault();
        const divMessage = document.createElement('img'); 
        divMessage.src = message.loading;
        divMessage.style.cssText = `
        display: block;
        margin: 0 auto;`
        form.insertAdjacentElement('afterend',divMessage );
    
        const formData = new FormData(form);

    // const object = {};
    // formData.forEach((item, i)=>{
    //     object[i] = item;
    // });
    // const json = JSON.stringify(object);

    fetch('server.php', {
        method: 'POST',
        // headers: { // 2  отправим json файл на наш сервер
        //   'Content-type': 'application/json'
        // },
        body:  formData // или обьект json, или formData
    }).then(data => data.text()) // тут преобразовали в обычный текст и получим что пользов ввел. как до этого request.response
    .then(data =>{ // тут если все успешно
            console.log(data); // вместо request.response- но тут не получим, что ввел пользователь. поэтому нужен еще then
            showThanksModal(message.success);
            divMessage.remove()
    }).catch(()=>{// тут если ошибка
        showThanksModal(message.failure); // даже если ошибка, то не получим это сообщение. а получим все ок. ошибку видно только в консоле
    }).finally(()=>{ // это важно, потому что у нас есть действия, кот выполняются всегда
        form.reset();
    })
    });   
}
//============================
function showThanksModal(message){

    const prevModal = document.querySelector('.modal__dialog');
    prevModal.classList.add('hide');
    modalOpen();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
    <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div  class="modal__title">${message}</div>       
     </div>
    `;

    modal.append(thanksModal)

    setTimeout(()=>{
        thanksModal.remove()
        prevModal.classList.add('show');
        prevModal.classList.remove('hide');
        modalClose();
    }, 2000);   
};







