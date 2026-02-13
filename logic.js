/**
 * Core validation logic for the Modular Architect Engine.
 * Handles spatial, electrical, and logical constraints.
 */

export const ValidationEngine = {
    /**
     * Checks if a component can physically and logically fit into a target slot.
     */
    validatePlacement(targetSlotId, component, state) {
        const platform = state.selectedPlatform;
        if (!platform) return { valid: false, error: 'No platform selected' };

        const targetIndex = parseInt(targetSlotId.replace('slot-', ''));
        
        // 1. Physical Boundary Check
        if (targetIndex + component.slots_occupied - 1 > platform.max_slots) {
            return { valid: false, error: 'Component exceeds platform boundaries' };
        }

        // 2. Depth Compatibility
        if (component.depth === 'full' && !platform.is_full_depth) {
            return { valid: false, error: 'Depth mismatch: requires full-depth chassis' };
        }

        // 3. Rule-based Compatibility
        const rules = state.compatibilityRules[platform.id];
        if (rules) {
            const allowedForType = rules[component.type];
            if (Array.isArray(allowedForType) && !allowedForType.includes(component.id)) {
                return { valid: false, error: 'Component logically incompatible with platform' };
            }
        }

        return { valid: true };
    },

    /**
     * Calculates total power and weight for the current configuration.
     */
    calculateMetrics(slots, componentsData) {
        let totalPower = 0;
        let totalWeight = 0;

        Object.values(slots).forEach(compId => {
            const comp = componentsData.find(c => c.id === compId);
            if (comp) {
                totalPower += (comp.power_consumption || 0);
                totalWeight += (comp.weight || 0);
            }
        });

        return { totalPower, totalWeight };
    }
};
