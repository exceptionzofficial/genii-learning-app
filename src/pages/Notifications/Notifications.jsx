import { useState, useEffect } from 'react';
import {
    Bell,
    Clock,
    AlertCircle,
    ArrowLeft,
    ShieldCheck,
    BellOff,
    Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { notificationsAPI } from '../../services/api';
import './Notifications.css';

function Notifications() {
    const { selectedClass, user, isAuthenticated } = useApp();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [permissionStatus, setPermissionStatus] = useState(Notification.permission);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                // Get user's board if available, otherwise 'all'
                const board = user?.board || 'all';
                const response = await notificationsAPI.getNotifications(selectedClass, board);
                if (response.success) {
                    setNotifications(response.data);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [selectedClass, user]);

    const requestNotificationPermission = async () => {
        try {
            const permission = await Notification.requestPermission();
            setPermissionStatus(permission);
            if (permission === 'granted') {
                new Notification('Genii Books', {
                    body: 'You will now receive notifications from us!'
                });
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="notifications-page">
            <div className="container notifications-container">
                {/* Header */}
                <div className="notifications-header">
                    <Link to="/" className="back-link">
                        <ArrowLeft size={20} />
                        <span>Back to Home</span>
                    </Link>
                    <h1 className="page-title">Notifications</h1>
                </div>

                {/* Browser Notification Setup */}
                <div className="notification-settings-card">
                    <div className="settings-icon">
                        {permissionStatus === 'granted' ? (
                            <ShieldCheck size={24} className="icon-success" />
                        ) : (
                            <BellOff size={24} className="icon-warning" />
                        )}
                    </div>
                    <div className="settings-info">
                        <h3>Browser Notifications</h3>
                        <p>
                            {permissionStatus === 'granted'
                                ? 'Notifications are enabled for this browser.'
                                : 'Enable notifications to stay updated with new materials and exam tips.'}
                        </p>
                    </div>
                    {permissionStatus !== 'granted' && (
                        <button
                            className="btn btn-primary"
                            onClick={requestNotificationPermission}
                        >
                            Enable Now
                        </button>
                    )}
                </div>

                {/* Notifications List */}
                <div className="notifications-list">
                    {loading ? (
                        <div className="loading-state">
                            <Loader2 size={32} className="spin" />
                            <p>Fetching your notifications...</p>
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="empty-state">
                            <Bell size={48} />
                            <h3>No Notifications</h3>
                            <p>You're all caught up! New notifications for {selectedClass.toUpperCase()} will appear here.</p>
                        </div>
                    ) : (
                        notifications.map((notif) => (
                            <div key={notif.notificationId} className="notification-card">
                                <div className="notif-icon-circle">
                                    <Bell size={20} />
                                </div>
                                <div className="notif-content">
                                    <div className="notif-header">
                                        <h4 className="notif-title">{notif.title}</h4>
                                        <div className="notif-time">
                                            <Clock size={12} />
                                            <span>{formatDate(notif.createdAt)}</span>
                                        </div>
                                    </div>
                                    <p className="notif-body">{notif.message}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Notifications;
