const ws = new WebSocket('wss://chat-prikol.onrender.com')
const submitButton = document.querySelector('.submit_wrapper button')
const submitInput = document.querySelector('.submit_wrapper input')
const formWrapper = document.querySelector('.form_wrapper')
const myNicknameInput = document.querySelector('.my_nickname_wrapper input')
myNicknameInput.value = 'LEXA'
const chat = document.querySelector('.chat')

function send(){
    const name = myNicknameInput.value
    const message = submitInput.value
    console.log(name, message)
    ws.send(JSON.stringify({
        name, message
    }))
    submitInput.value = ''
    submitInput.focus()
    return false
}
function checkEmpty(){
    if(!submitInput.value || !myNicknameInput.value){
        if(!myNicknameInput.value && !submitInput.value){
            myNicknameInput.style.cssText = 'background-color: rgb(197 41 41)'
            submitInput.style.cssText = 'background-color: rgb(197 41 41)'
            setTimeout(()=>{
                myNicknameInput.style.cssText = ''
                submitInput.style.cssText = ''
            }, 1100)
        } else{
            if(!myNicknameInput.value){
                myNicknameInput.style.cssText = 'background-color: rgb(197 41 41)'
                setTimeout(()=>{
                    myNicknameInput.style.cssText = ''
                }, 1100)
            }
            if(!submitInput.value){
                submitInput.style.cssText = 'background-color: rgb(197 41 41)'
                setTimeout(()=>{
                    submitInput.style.cssText = ''
                }, 1100)
            }
        }
        return true
    }
}
window.addEventListener('keypress',(e)=>{
    if(e.code == 'Enter' && submitInput == document.activeElement){
        if(checkEmpty()){
            return
        }
        if(getComputedStyle(formWrapper).transform == 'none'){
            formWrapper.style.cssText = 'transform: rotate3d(2, 0, 1, 360deg);'
        } else{
            formWrapper.style.transform = ''
        }
        send()
    }
})

submitButton.addEventListener('click', (e)=>{
    e.preventDefault()
    if(checkEmpty()){
        return
    }
    if(getComputedStyle(formWrapper).transform == 'none'){
        formWrapper.style.cssText = 'transform: rotate3d(2, 0, 1, 360deg);'
    } else{
        formWrapper.style.transform = ''
    }
    send()
})


ws.addEventListener('message', (rawMessage)=>{
    const message = JSON.parse(rawMessage.data)
    console.log(message, message.length)
    for(let i = 0; i < message.length; i++){
        const mesComponent = `
        <div class="message">
            <div class="nickname">${message[i].name}</div>
            <div class="message_text">${message[i].message}</div>
        </div>`
        chat.innerHTML+= mesComponent
    }

})
