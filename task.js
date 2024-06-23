(function() {
    const isPhantomInstalled = window.phantom?.solana?.isPhantom;
    console.log(`Phantom installed: ${isPhantomInstalled}`);

    if (!isPhantomInstalled) {
        console.error("Phantom not detected. Aborting process.");
        return;
    }

    function generateFakeUsername() {
        const adjectives = ["Cool", "Fast", "Smart", "Clever", "Happy"];
        const nouns = ["Tiger", "Lion", "Panda", "Eagle", "Shark"];
        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        const randomNum = Math.floor(Math.random() * 1000);
        return `${randomAdjective}${randomNoun}${randomNum}`;
    }

    function generateYouTubeChannelId() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = 'UC';
        for (let i = 0; i < 22; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    function simulateClick(element) {
        if (element) {
            element.click();
        } else {
            console.error("Element not found for clicking");
        }
    }

    function clickGetPointButtonForPlatform(platform) {
        const buttons = Array.from(document.querySelectorAll('button'));
        const button = buttons.find(btn => btn.innerText.includes('Get the point') && btn.closest('div').innerText.includes(platform));
        if (button) {
            console.log(`Clicking "Get the point" button for ${platform}`);
            simulateClick(button);
        } else {
            console.error(`"Get the point" button not found for ${platform}`);
        }
    }

    function fillInput(platform) {
        const input = document.querySelector('input[type="text"]');
        if (input) {
            let inputValue;

            switch(platform) {
                case 'Follow us in X':
                    inputValue = `https://x.com/${generateFakeUsername()}`;
                    break;
                case 'Follow us in Medium':
                    inputValue = `https://medium.com/@${generateFakeUsername()}`;
                    break;
                case 'Follow us in Discord':
                    inputValue = generateFakeUsername();
                    break;
                case 'Follow us in Telegram':
                    inputValue = `https://t.me/${generateFakeUsername()}`;
                    break;
                case 'Follow us in YouTube':
                    inputValue = `https://www.youtube.com/channel/${generateYouTubeChannelId()}`;
                    break;
                default:
                    inputValue = generateFakeUsername();
                    break;
            }

            console.log(`Filling the input field with ${inputValue}`);
            input.value = inputValue;
        } else {
            console.error("Input field not found");
        }
    }

    function clickConfirm(platformUrl) {
        const input = document.querySelector('input[type="text"]');
        if (input) {
            const parentDiv = input.closest('div');
            if (parentDiv) {
                const confirmButton = parentDiv.querySelector(`a[href="${platformUrl}"]`);
                if (confirmButton) {
                    console.log('Clicking "Confirm" button');
                    simulateClick(confirmButton);
                } else {
                    console.error('"Confirm" button not found within the input container');
                }
            } else {
                console.error('Parent div for input not found');
            }
        } else {
            console.error("Input field not found");
        }
    }

    function isPlatformProcessed(platform) {
        const checkIcon = Array.from(document.querySelectorAll('svg')).find(svg => 
            svg.classList.contains('fill-[#D87006]') && 
            svg.getAttribute('data-testid') === 'CheckIcon' && 
            svg.closest('div').innerText.includes(platform)
        );
        return !!checkIcon;
    }

    function showCompleted(platform) {
        console.log(`${platform} completed`);
    }

    const platforms = [
        { name: 'Follow us in X', url: 'https://x.com/Pambicoin' },
        { name: 'Follow us in Medium', url: 'https://medium.com/@PAMBII' },
        { name: 'Follow us in Discord', url: 'https://discord.gg/pambii' },
        { name: 'Follow us in Telegram', url: 'https://t.me/+CUw6TJ5g869kNWM1' },
        { name: 'Follow us in YouTube', url: 'https://www.youtube.com/@DalasReview' }
    ];

    function processPlatform(index) {
        if (index >= platforms.length) return;

        const platform = platforms[index].name;
        const platformUrl = platforms[index].url;

        if (isPlatformProcessed(platform)) {
            console.log(`${platform} already processed, skipping.`);
            processPlatform(index + 1);
        } else {
            clickGetPointButtonForPlatform(platform);

            setTimeout(() => {
                fillInput(platform);
                setTimeout(() => {
                    clickConfirm(platformUrl);
                    setTimeout(() => {
                        if (isPlatformProcessed(platform)) {
                            showCompleted(platform);
                        }
                        processPlatform(index + 1);
                    }, 2000);
                }, 2000);
            }, 3000);
        }
    }

    processPlatform(0);

})();
