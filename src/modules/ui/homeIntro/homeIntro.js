import { LightningElement } from 'lwc';

export default class HomeIntro extends LightningElement {
    handleGetStarted() {
        const componentSection = this.template.host.closest('lightning-layout-item')?.nextElementSibling;
        if (componentSection) {
            componentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}
