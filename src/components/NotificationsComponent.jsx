import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const NotificationsComponentView = ({ notifications }) => {
    const notification = notifications;

    let content = null;
    let classType = null;

    if (notification.added !== undefined) {
        if (notification.added === true) {
            content = notification.name + ' has been added to your list';
            classType = 'positive';
        } else {
            content = notification.name + ' has been removed from your list';
            classType = 'negative';
        }

        const element = $('.notifications');
        element.removeClass('positive negative').addClass('visible ' + classType);

        // window.clearTimeout(notificationTimout);

        setTimeout(() => {
            element.removeClass('visible');
        }, 3000);
    }

    return (
        <section className="notifications">
            <p className="notification-text">
                {content}
            </p>
        </section>
    );
};

const mapStateToProps = (state) => {
    return {
        notifications: state.notifications
    };
};

NotificationsComponentView.propTypes = {
    notifications: PropTypes.arrayOf
}

const NotificationsComponent = connect(mapStateToProps)(NotificationsComponentView);

export default NotificationsComponent;
