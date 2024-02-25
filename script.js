$(document).ready(function() {
    $(".sortable").sortable({
        connectWith: ".sortable",
        update: function(event, ui) {
            updateTasksCount();
        }
    }).disableSelection();

    $(document).on("click", ".sortable li", function() {
        $(this).toggleClass("checked");
        $(this).find("span").toggleClass("completed");
        if ($(this).hasClass("checked")) {
            showMotivationMessage();
        }
        updateTasksCount();
    });

    $(document).on("click", ".sortable li .delete-task", function(event) {
        event.stopPropagation(); // Остановить всплытие события, чтобы не вызывался клик на родительском элементе
        $(this).parent().remove();
        updateTasksCount();
    });
});

function addTask(quadrant) {
    var input = $("#task-input-" + quadrant.substr(-1));
    var taskList = $("#" + quadrant);

    if (input.val() === "") {
        alert("Пожалуйста, введите задачу!");
        return;
    }

    var li = $("<li></li>").addClass("draggable");
    var checkbox = $("<input type='checkbox'>");
    checkbox.appendTo(li);
    $("<span></span>").text(input.val()).appendTo(li);
    var deleteButton = $("<span></span>").addClass("delete-task").html("&times;");
    li.append(deleteButton);
    taskList.append(li);

    input.val("");
    updateTasksCount();
}

function updateTasksCount() {
    $(".quadrant h2").each(function() {
        $(this).find(".task-count").remove(); // Удаление предыдущей информации о количестве задач
    });

    $(".quadrant").each(function() {
        var quadrant = $(this);
        var count = quadrant.find("ul").children("li").length;
        quadrant.find("h2").append(" <span class='task-count'>(" + count + ")</span>");
    });

    var progressBar = $(".progress-bar");
    var totalTasksCount = $(".sortable li").length;
    var completedTasksCount = $(".sortable li.checked").length;
    var progressBarWidth = (completedTasksCount / totalTasksCount) * 100;
    progressBar.css("width", progressBarWidth + "%");
}

function showMotivationMessage() {
    var messages = [
        "Отличная работа! Продолжайте в том же духе!",
        "Вы справляетесь на ура! Продолжайте двигаться вперед!",
        "У вас прекрасный прогресс! Не останавливайтесь!",
        "Браво! Вы делаете огромные успехи!",
        "Продолжайте так же! Ваши достижения впечатляют!"
    ];
    var message = messages[Math.floor(Math.random() * messages.length)];
    $("#motivationMessage").text(message).fadeIn().delay(3000).fadeOut();
}
$(document).ready(function(){
    // Функция для показа сообщения мотивации
    function showMotivationMessage(message) {
        var motivationMessage = $(".motivation-message");
        motivationMessage.text(message);
        motivationMessage.addClass("show");
        setTimeout(function(){
            motivationMessage.removeClass("show");
        }, 3000); // Скрыть сообщение через 3 секунды
    }

    // Пример использования функции для показа сообщения
    showMotivationMessage("Привет! Давай начнем работу!");
});
// Добавьте этот код, если хотите, чтобы кнопки открывали соответствующие профили в новой вкладке
document.querySelectorAll('.social-button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const url = window.location.href;
        const network = this.getAttribute('class').split(' ')[1]; // Определение социальной сети
        switch (network) {
            case 'instagram':
                window.open('https://www.instagram.com/', '_blank');
                break;
            case 'telegram':
                window.open('https://t.me/', '_blank');
                break;
            default:
                break;
        }
    });
});
