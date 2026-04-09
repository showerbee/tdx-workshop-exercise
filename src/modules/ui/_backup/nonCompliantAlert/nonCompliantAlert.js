import { LightningElement, track } from 'lwc';

export default class NonCompliantAlert extends LightningElement {
    @track alerts = [
        { id: 1, type: 'error', title: 'Connection Failed', message: 'Unable to connect to the server. Please check your network.' },
        { id: 2, type: 'warning', title: 'Session Expiring', message: 'Your session will expire in 5 minutes.' },
        { id: 3, type: 'success', title: 'Changes Saved', message: 'Your profile has been updated successfully.' }
    ];

    get alertsWithTypes() {
        return this.alerts.map(alert => ({
            ...alert,
            isError: alert.type === 'error',
            isWarning: alert.type === 'warning',
            isSuccess: alert.type === 'success',
            alertClass: alert.type
        }));
    }

    handleDismiss(event) {
        const alertId = event.currentTarget.dataset.id;
        this.alerts = this.alerts.filter(a => a.id !== parseInt(alertId, 10));
    }
}
