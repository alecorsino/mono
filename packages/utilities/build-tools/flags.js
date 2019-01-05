/**
 * Use BUNDLE MODE when you want to bundle absolutelty everthing you import
 * OR is a TOP LEVEL APP/PACAKGE THAT WILL NOT BE BUNDLE ANY LONGER.
 * BECAUSE IT WILL include all third party imported packages from node_modules.
 *
 */

function envFlag(FLAG_NAME, FLAG_VALUE) {
    if (process.env[FLAG_NAME] !== undefined) {
        const PROP = process.env[FLAG_NAME];
        console.log(`[ENV FLAG] ${FLAG_NAME} : ${process.env[FLAG_NAME]}`);
        if (typeof PROP === 'boolean') return PROP;
        if (typeof PROP === 'string') return PROP.toUpperCase() === FLAG_VALUE;
    }

    return undefined;
}

/**
 * Use with rollup --environment flag
 * i.e
 * rollup -c --environment BUNDLE:ALL -> process.env.BUNDLE === 'ALL'
 * rollup -c --environment DEVELOPMENT -> process.env.DEVELOPMENT === true
 * rollup -c --environment DEVELOPMENT,OTHER_FLAG -> process.env.DEVELOPMENT and  process.env.OTHER_FLAG
 */
module.exports.BUNDLE_ALL = envFlag('BUNDLE', 'ALL');
