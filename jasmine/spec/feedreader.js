$(function() {
    describe('RSS Feeds', function() {
		
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

		it('have URLs defined', function() {
			for (let feed of allFeeds) {
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			}
		});

		it('have names defined', function() {
			for (let feed of allFeeds) {
				expect(feed.name).toBeDefined();
				expect(feed.name.length).not.toBe(0);
			}
		});
    });

	describe('The menu', function() {
		function isMenuHidden() {
			return document.getElementsByTagName('BODY')[0].classList.contains('menu-hidden');
		}
		
        it('is hidden by default', function() {
			expect(isMenuHidden()).toBe(true);
        });

		it('changes visibility when the menu icon is clicked', function() {	
			function simulateMenuClick() {
				document.getElementsByTagName('BODY')[0].classList.toggle('menu-hidden');
			}
			
			simulateMenuClick(); //simulates first click on menu button
			expect(isMenuHidden()).toBe(false);

			simulateMenuClick(); //simulates second click on menu button
			expect(isMenuHidden()).toBe(true);
		});
    });

	describe('Initial Entries', function() {
		
		beforeEach(function(done) {
			loadFeed(0, function() {
				done();
			});
		});
        
		it('are loaded in feed', function(done) {
			let isEntryElementPresent = false;
			const entryElements = document.getElementsByClassName('feed')[0].getElementsByClassName('entry');

			for (let entryElement of entryElements) {
				if (entryElement.className === 'entry') {
					isEntryElementPresent = true;
					break;
				}
			}
			expect(isEntryElementPresent).toBe(true);
			done();
		});
    });

	describe('New Feed Selection', function() {
		let firstContent;
		let secondContent;
		
		beforeEach(function(done) {
			function getFeedContent() {
				return document.getElementsByClassName('feed')[0].textContent;
			}
			
			loadFeed(0, function() { //loads 1st feed
				firstContent = getFeedContent(); //saves results
				loadFeed(1, function() { //loads 2nd feed
					secondContent = getFeedContent(); //saves results
					done();
				});
			});
		});
		
        it('is loaded each time anew', function(done) {
			expect(firstContent).not.toBe(secondContent);
			done();
        });
    });   
}()); // ensures tests run when DOM is ready
