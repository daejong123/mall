$('.submit-btn').click(() => {
    const username = $('#username').val()
    const password = $('#password').val();
    if (username.trim() === "") {
        alert('用户名不可以为空!');
        return;
    }
    if (password.trim() === "") {
        alert('密码不可以为空!');
        return;
    }
    const data = { username, password };
    console.log(data);
    $.ajax({
        type: "post",
        url: "/backLogin",
        async: true,
        data: data,
        success: function(data) {
            if (data.code === 2000) {
                location.href = "/index";
            } else {
                alert(data.msg);
            }
        },
        error: function() {
            alert("网络故障，请检查");
        }
    })
});

$(document).keyup(function(event) {
    if (event.keyCode == 13) {
        $(".submit-btn").trigger("click");
    }
});