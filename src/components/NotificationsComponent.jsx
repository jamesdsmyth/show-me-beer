import React from 'react'
import { connect } from 'react-redux'

class NotificationsComponentView extends React.Component {
    render () {

        var notification = this.props.notifications,
            content = null,
            visibility = null,
            classType = null;

        if(notification.added !== undefined) {

            if(notification.added === true) {
                content = notification.name + ' has been added to your list';
                classType = 'positive';
            } else {
                content = notification.name + ' has been removed from your list';
                classType = 'negative';
            }

            var element = $('.notifications');
            element.removeClass('positive negative').addClass('visible ' + classType);

            window.clearTimeout(notificationTimout)

            var notificationTimout = setTimeout(() => {
                element.removeClass('visible');
            }, 3000);
        }

        return (
            <section className="notifications">
                <p className="notification-text">
                    {content}
                </p>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notifications: state.notifications
    }
}

const NotificationsComponent = connect(mapStateToProps)(NotificationsComponentView)

export default NotificationsComponent
