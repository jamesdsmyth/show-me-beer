import React from 'react'
import { connect } from 'react-redux'

class NotificationsContainerView extends React.Component {
    render () {

        var notification = this.props.notifications,
            content = null,
            visibility = null;

        if(notification.added !== undefined) {
            content = notification.added === true ? notification.name + ' has been added to your list'  : notification.name + ' has been removed from your list';

            var element = $('.notifications');
            element.addClass('visible');

            window.clearTimeout(notificationTimout)

            var notificationTimout = setTimeout(() => {
                element.removeClass('visible');
            }, 3000);
        }

        return (
            <section className="notifications">
                <p>
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

const NotificationsContainer = connect(mapStateToProps)(NotificationsContainerView)

export default NotificationsContainer
