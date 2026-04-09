import { LightningElement, track } from 'lwc';

export default class SdlcPipeline extends LightningElement {
    @track activeStage = -1;
    _animationInterval = null;
    _prefersReducedMotion = false;

    stages = [
        {
            id: 'intent',
            label: 'Intent',
            iconName: 'utility:image',
            description: 'Figma, spec, requirements'
        },
        {
            id: 'plan',
            label: 'Plan',
            iconName: 'utility:strategy',
            description: 'Architecture & approach'
        },
        {
            id: 'build',
            label: 'Build',
            iconName: 'utility:builder',
            description: 'Component generation'
        },
        {
            id: 'validate',
            label: 'Validate',
            iconName: 'utility:check',
            description: 'Testing & review'
        },
        {
            id: 'output',
            label: 'Output',
            iconName: 'utility:lightning_extension',
            description: 'LWC/SLDS component'
        }
    ];

    connectedCallback() {
        this._prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.startAnimation();
    }

    disconnectedCallback() {
        this.stopAnimation();
    }

    startAnimation() {
        if (this._prefersReducedMotion) {
            this.activeStage = this.stages.length - 1;
            return;
        }

        let stageIndex = 0;

        const animate = () => {
            this.activeStage = stageIndex;
            stageIndex++;

            if (stageIndex >= this.stages.length) {
                setTimeout(() => {
                    stageIndex = 0;
                    this.activeStage = -1;
                    setTimeout(() => {
                        if (this._animationInterval) {
                            animate();
                        }
                    }, 500);
                }, 2000);
            } else {
                this._animationInterval = setTimeout(animate, 1200);
            }
        };

        this._animationInterval = setTimeout(animate, 800);
    }

    stopAnimation() {
        if (this._animationInterval) {
            clearTimeout(this._animationInterval);
            this._animationInterval = null;
        }
    }

    get stagesWithState() {
        return this.stages.map((stage, index) => ({
            ...stage,
            isActive: index === this.activeStage,
            isComplete: index < this.activeStage,
            isPending: index > this.activeStage,
            hasConnector: index < this.stages.length - 1,
            stageClass: this.getStageClass(index),
            connectorClass: this.getConnectorClass(index)
        }));
    }

    getStageClass(index) {
        const classes = ['pipeline-stage'];
        if (index === this.activeStage) {
            classes.push('stage-active');
        } else if (index < this.activeStage) {
            classes.push('stage-complete');
        } else {
            classes.push('stage-pending');
        }
        return classes.join(' ');
    }

    getConnectorClass(index) {
        const classes = ['pipeline-connector'];
        if (index < this.activeStage) {
            classes.push('connector-complete');
        } else if (index === this.activeStage) {
            classes.push('connector-active');
        }
        return classes.join(' ');
    }
}
