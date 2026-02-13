/**
 * Normalized compatibility matrix.
 * Defines hardware relationships without proprietary naming.
 */

export const SYSTEM_RULES = {
    "platform_alpha": {
        "networking": ["net_switch_100", "net_router_v1"],
        "compute": true, // true means all compute modules are allowed
        "storage": ["disk_array_2tb", "disk_array_4tb"],
        "power": true
    },
    "platform_beta_slim": {
        "networking": ["net_switch_100"],
        "compute": ["edge_node_small"],
        "storage": false, // storage not supported on slim platform
        "power": true
    }
};
