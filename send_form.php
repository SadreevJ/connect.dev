<?php
// Проверяем, что запрос отправлен методом POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $name = trim($_POST["name"]);
    $phone = trim($_POST["phone"]);

    // Получаем выбранные методы связи
    $contactMethods = isset($_POST["contact_method"]) ? $_POST["contact_method"] : [];

    // Формируем текст сообщения
    $message = "Имя: $name\n";
    $message .= "Телефон: $phone\n";

    // Добавляем выбранные методы связи
    if (!empty($contactMethods)) {
        if (is_array($contactMethods)) {
            $message .= "Предпочтительный способ связи: " . implode(", ", $contactMethods) . "\n";
        } else {
            $message .= "Предпочтительный способ связи: $contactMethods\n";
        }
    } else {
        $message .= "Предпочтительный способ связи не указан\n";
    }

    // Заголовки для письма
    $to = "arkgrosscorp@gmail.com";
    $subject = "Новая заявка на консультацию с сайта";
    $headers = "From: noreply@" . $_SERVER['HTTP_HOST'] . "\r\n";
    $headers .= "Reply-To: $name <noreply@" . $_SERVER['HTTP_HOST'] . ">\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Отправляем письмо
    if (mail($to, $subject, $message, $headers)) {
        // Если письмо отправлено успешно
        $response = [
            'status' => 'success',
            'message' => 'Ваша заявка успешно отправлена!'
        ];
    } else {
        // Если произошла ошибка при отправке
        $response = [
            'status' => 'error',
            'message' => 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.'
        ];
    }

    // Возвращаем ответ в JSON формате
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

// Если запрос отправлен не методом POST, перенаправляем на главную страницу
header('Location: index.html');
exit;
?>
