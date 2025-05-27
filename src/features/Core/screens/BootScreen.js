import SetupWarningScreen from 'exceptions/SetupWarningScreen';
import { useStorefront } from 'hooks';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { tailwind } from 'tailwind';
import { hasRequiredKeys, logError } from 'utils';
import { setI18nConfig } from 'utils/Localize';
import { set } from 'utils/Storage';

/**
 * BootScreen is a simple initialization screen, will load
 * the store or network information and navigate to the correct
 * screens.
 *
 * @component
 */
const BootScreen = ({ navigation }) => {
    const [error, setError] = useState(null);

    console.log('[BootScreen] Rendering BootScreen component');

    // If the required keys are not provided display the setup warning screen
    if (!hasRequiredKeys()) {
        console.log('[BootScreen] Missing required keys, showing SetupWarningScreen');
        return <SetupWarningScreen />;
    }

    // Initialize Storefront SDK
    const storefront = useStorefront();

    // If the storefront SDK throws an error display through setup warning
    if (storefront instanceof Error) {
        console.log('[BootScreen] Storefront SDK error:', storefront);
        return <SetupWarningScreen error={storefront} />;
    }

    // Initialize i18n
    setI18nConfig();
    console.log('[BootScreen] i18n config set');

    useEffect(() => {
        console.log('[BootScreen] useEffect started - fetching about info');

        storefront
            .about()
            .then((info) => {
                console.log('[BootScreen] Storefront info received:', info);

                set('info', info);

                if (info.is_store) {
                    console.log('[BootScreen] Detected single store, navigating to StorefrontScreen');
                    return navigation.navigate('StorefrontScreen', { info });
                } 
                
                if (info.is_network) {
                    console.log('[BootScreen] Detected network/multi-vendor, navigating to NetworkScreen');
                    return navigation.navigate('NetworkScreen', { info });
                } 
                
                // Added else block for unexpected response structure
                console.log('[BootScreen] Unexpected store/network type in API response:', info);
                setError(new Error('Invalid store/network type in API response.'));
            })
            .catch((error) => {
                console.log('[BootScreen] Error fetching storefront info:', error);
                setError(error);
                logError(error, '[  Error fetching storefront info!  ]');
            })
            .finally(() => {
                console.log('[BootScreen] Finally block - hiding boot splash in 300ms');
                setTimeout(() => {
                    RNBootSplash.hide();
                }, 300);
            });
    }, []);

    if (error) {
        console.log('[BootScreen] Rendering SetupWarningScreen due to error:', error);
        return <SetupWarningScreen error={error} />;
    }

    return (
        <SafeAreaView style={tailwind('bg-white')}>
            <View style={tailwind('flex items-center justify-center w-full h-full bg-white')}>
                <ActivityIndicator size="large" color={tailwind('text-gray-900')} />
            </View>
        </SafeAreaView>
    );
};

export default BootScreen;
