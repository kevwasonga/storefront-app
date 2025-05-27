module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        'preval',
        [
            'module-resolver',
            {
                root: ['./src'],
                extensions: ['.js', '.json'],
                alias: {
                    account: './src/features/Account',
                    auth: './src/features/Auth',
                    browser: './src/features/Browser',
                    cart: './src/features/Cart',
                    core: './src/features/Core',
                    exceptions: './src/features/Exceptions',
                    network: './src/features/Network',
                    places: './src/features/Places',
                    shared: './src/features/Shared',
                    ui: './src/interface',
                    // Additional aliases
                    utils: './src/utils',
                    hooks: './src/hooks',
                    services: './src/services',
                    config: './src/config',
                    tailwind: './src/tailwind', // tailwind  for styling
                    components: './src/components',
                    assets: './assets',
                    constants: './src/constants',
                    navigation: './src/navigation',
                    screens: './src/screens',
                    theme: './src/theme',
                },
            },
        ],
    ],
};