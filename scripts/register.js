const $main_button = document.querySelector (".main_button")
const $email = document.querySelector (".email_input")
const $password = document.querySelector (".password_input")

$main_button.addEventListener ("click", registerUser)

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

async function registerUser () {
    try {
        console.log($email.value)

        if (!validateEmail($email.value)) {
            alert("Почта введена неверно")
            return;
        }

        console.log($password.value )
        if ($password.value.length < 8) {
            alert ("пароль должен содержать более 8 символов")
        }
        
        const data = await request("register", 
        "POST", 
        {email: $email.value, password: $password.value}
        );

        console.log(data)
    } catch (e) {
        console.log("Ошибка при регистрации: " + e.messege)
    }
}

//https://backend.com/api/getuers  GETUSERS == endpont
async function request (endpoint, method="GET", body = {}) {
    try {
        const baseUrl = "https://link-shorter6.herokuapp.com/";

        const response = await fetch(baseUrl+endpoint, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.log("Код ответа: ", response.status);
            throw new Error("Что то пошло не так")
        }

        const data = await response.json()

        return data;
    } catch (e) {
        const errMessege = `Ошибка при обращении на ${endpoint}, текст ошибки: ${e.messege}`
        console.log(errMessege)
        throw new Error(errMessege)
    }
}