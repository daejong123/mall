$(".logout").click(() => {
    const username = $('#username').text().trim();
    $.ajax({
        type: "post",
        url: "/backLogout",
        data: { username },
        success: data => {
            alert(data.msg);
            location.href = "/";
        },
        error: function() {
            alert("网络故障，请检查");
        }
    });
});

$(".code-btn").click(() => {
    const username = $('#username').text().trim();
    $.ajax({
        type: "post",
        url: "/generateCode",
        data: { username },
        success: data => {
            if (data.code === 6001) {
                alert(data.msg);
                location.href = "/";
            } else if (data.code === 5000) {
                const code = data.data;
                $('.code-btn-content').text(code);
            }
        },
        error: function() {
            alert("网络故障，请检查");
        }
    });
});

$(function() {
    const username = $('#username').text().trim();
    $.ajax({
        type: 'get',
        url: "/allUsers",
        data: { username },
        success: (data) => {
            if (data.code === 7000) {
                const users = data.data;
                const userHtml = users.map(user => {
                    const html = `<div class="cai-mall-user">
                                    <div class="name"><span class="user-label">用户名:</span> ${user.name}</div>
                                    <div class="phone"><span class="user-label">手机号:</span> ${user.phone}</div>
                                    <div class="is-expired"><span class="user-label">账号状态:</span> ${user["is_expired"] === 0 ? "使用中":"已失效"}</div>
                                    <div class="identity"><span class="user-label">用户身份:</span> ${user["identity"] === 0 ? "买家":"商家"}</div>
                                    <div class="create-time"><span class="user-label">注册时间:</span>${new Date(user["create_at"]).toLocaleString()}</div>
                                </div>`;
                    return html;
                }).join("");
                $(".all-users").html(userHtml);
            } else {
                alert(data.msg);
                location.href = "/";
            }
        },
        error: function() {
            alert("网络故障，请检查");
        }
    });
})