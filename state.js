/**
 * Manages the global state of the configuration.
 */

export class SystemState {
    constructor(rules) {
        this.selectedPlatform = null;
        this.slots = {}; // Stores slot-id: component-id mapping
        this.compatibilityRules = rules || {};
        this.metrics = { totalPower: 0, totalWeight: 0 };
    }

    setPlatform(platform) {
        this.selectedPlatform = platform;
        this.slots = {}; // Reset slots on platform change
        this.updateMetrics();
    }

    addComponent(slotId, component) {
        this.slots[slotId] = component.id;
        this.updateMetrics();
    }

    removeComponent(slotId) {
        delete this.slots[slotId];
        this.updateMetrics();
    }

    updateMetrics() {
        // Implementation for metric recalculation
    }
}
