<?php
require_once __DIR__ . '/../vendor/autoload.php';

session_start();

// Initialize Twig
$loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/../templates');
$twig = new \Twig\Environment($loader, [
    'cache' => false,
    'debug' => true,
]);

// Handle form submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    
    switch ($action) {
        case 'login':
        case 'signup':
            $email = $_POST['email'] ?? '';
            $password = $_POST['password'] ?? '';
            
            if ($email && strlen($password) >= 6) {
                $_SESSION['ticketapp_session'] = [
                    'email' => $email,
                    'token' => bin2hex(random_bytes(16))
                ];
                header('Location: index.php?page=dashboard');
                exit;
            } else {
                $_SESSION['error'] = 'Invalid credentials. Password must be at least 6 characters.';
                $page = ($action === 'login') ? 'login' : 'signup';
                header('Location: index.php?page=' . $page);
                exit;
            }
            break;
            
        case 'logout':
            unset($_SESSION['ticketapp_session']);
            header('Location: index.php');
            exit;
            
        case 'create_ticket':
            $title = trim($_POST['title'] ?? '');
            $description = trim($_POST['description'] ?? '');
            $status = $_POST['status'] ?? 'open';
            $priority = $_POST['priority'] ?? 'medium';
            
            if ($title && in_array($status, ['open', 'in_progress', 'closed'])) {
                if (!isset($_SESSION['tickets'])) {
                    $_SESSION['tickets'] = [];
                }
                
                $_SESSION['tickets'][] = [
                    'id' => time() . rand(1000, 9999),
                    'title' => $title,
                    'description' => $description,
                    'status' => $status,
                    'priority' => $priority
                ];
                
                $_SESSION['success'] = 'Ticket created successfully';
            } else {
                $_SESSION['error'] = 'Title is required and status must be valid';
            }
            header('Location: index.php?page=tickets');
            exit;
            
        case 'update_ticket':
            $id = $_POST['id'] ?? '';
            $title = trim($_POST['title'] ?? '');
            $description = trim($_POST['description'] ?? '');
            $status = $_POST['status'] ?? 'open';
            $priority = $_POST['priority'] ?? 'medium';
            
            if ($title && in_array($status, ['open', 'in_progress', 'closed'])) {
                if (isset($_SESSION['tickets'])) {
                    foreach ($_SESSION['tickets'] as &$ticket) {
                        if ($ticket['id'] == $id) {
                            $ticket['title'] = $title;
                            $ticket['description'] = $description;
                            $ticket['status'] = $status;
                            $ticket['priority'] = $priority;
                            break;
                        }
                    }
                }
                $_SESSION['success'] = 'Ticket updated successfully';
            } else {
                $_SESSION['error'] = 'Title is required and status must be valid';
            }
            header('Location: index.php?page=tickets');
            exit;
            
        case 'delete_ticket':
            $id = $_POST['id'] ?? '';
            if (isset($_SESSION['tickets'])) {
                $_SESSION['tickets'] = array_filter($_SESSION['tickets'], function($ticket) use ($id) {
                    return $ticket['id'] != $id;
                });
                $_SESSION['tickets'] = array_values($_SESSION['tickets']);
            }
            $_SESSION['success'] = 'Ticket deleted successfully';
            header('Location: index.php?page=tickets');
            exit;
    }
}

// Simple routing
$page = $_GET['page'] ?? 'landing';

// Check authentication for protected routes
$protectedRoutes = ['dashboard', 'tickets'];
if (in_array($page, $protectedRoutes) && !isset($_SESSION['ticketapp_session'])) {
    header('Location: index.php?page=login');
    exit;
}

// Get flash messages
$error = $_SESSION['error'] ?? null;
$success = $_SESSION['success'] ?? null;
unset($_SESSION['error'], $_SESSION['success']);

// Prepare data for template
$data = [
    'user' => $_SESSION['ticketapp_session'] ?? null,
    'tickets' => $_SESSION['tickets'] ?? [],
    'error' => $error,
    'success' => $success,
    'page' => $page
];

// Render appropriate template
try {
    echo $twig->render($page . '.html.twig', $data);
} catch (\Twig\Error\LoaderError $e) {
    echo $twig->render('landing.html.twig', $data);
}