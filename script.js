/**
 * Trimex Connect - College of Computer Studies (CCS)
 * Interactive Script for Navigation, Gazette Filters, UI Video Modal, and Enrollment Validation
 */

(function () {
    'use strict';

    // Helper functions
    function $(selector, context) {
        return (context || document).querySelector(selector);
    }
    function $$(selector, context) {
        return Array.prototype.slice.call((context || document).querySelectorAll(selector));
    }

    // Set Copyright Year
    var yrEl = $('#copyrightYear');
    if (yrEl) {
        yrEl.textContent = new Date().getFullYear();
    }

    // Mobile Navigation, Backdrop & Submenu Accordion
    var navToggle = $('#navToggle');
    var primaryNav = $('#primaryNav');
    var navBackdrop = $('#navBackdrop');
    var backToTopBtn = $('#backToTopBtn');
    var mobileBarItems = $$('.mobile-bar-item');

    function closeMobileNav() {
        if (!primaryNav) return;
        primaryNav.classList.remove('is-open');
        if (navToggle) {
            navToggle.classList.remove('is-active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
        if (navBackdrop) {
            navBackdrop.classList.remove('is-active');
        }
        document.body.classList.remove('nav-open');
    }

    function openMobileNav() {
        if (!primaryNav) return;
        primaryNav.classList.add('is-open');
        if (navToggle) {
            navToggle.classList.add('is-active');
            navToggle.setAttribute('aria-expanded', 'true');
        }
        if (navBackdrop) {
            navBackdrop.classList.add('is-active');
        }
        document.body.classList.add('nav-open');
    }

    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', function () {
            if (primaryNav.classList.contains('is-open')) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });

        if (navBackdrop) {
            navBackdrop.addEventListener('click', closeMobileNav);
        }

        // Close mobile nav on Esc key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
                closeMobileNav();
            }
        });

        // Close on in-page anchor click
        $$('a[href^="#"]', primaryNav).forEach(function (link) {
            link.addEventListener('click', function (e) {
                // If this is a dropdown toggle on mobile, let the dropdown toggle handler deal with it
                if (window.innerWidth <= 768 && link.classList.contains('dropdown-toggle')) {
                    return;
                }
                if (window.innerWidth <= 768) {
                    closeMobileNav();
                }
            });
        });

        // Mobile dropdown click toggle (with clean single-accordion behavior)
        $$('.has-dropdown').forEach(function (item) {
            var toggleLink = item.querySelector('.dropdown-toggle');
            if (toggleLink) {
                toggleLink.addEventListener('click', function (e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        e.stopPropagation();
                        // Close any other open mobile submenus for a clean accordion effect
                        $$('.has-dropdown').forEach(function (otherItem) {
                            if (otherItem !== item) {
                                otherItem.classList.remove('mobile-expanded');
                                var otherToggle = otherItem.querySelector('.dropdown-toggle');
                                if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
                            }
                        });
                        item.classList.toggle('mobile-expanded');
                        var expanded = item.classList.contains('mobile-expanded');
                        toggleLink.setAttribute('aria-expanded', String(expanded));
                    }
                });
            }
        });

        // Auto close if window is resized above 768px
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768 && primaryNav.classList.contains('is-open')) {
                closeMobileNav();
            }
        }, { passive: true });
    }

    // Floating Back to Top Button
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    if (mobileBarItems.length > 0) {
        mobileBarItems.forEach(function (item) {
            item.addEventListener('click', function () {
                closeMobileNav();
            });
        });
    }

    // Active Navigation Link on Scroll
    var sectionLinks = $$('.nav-list > .nav-item > .nav-link');
    var trackedSections = [
        { id: 'home', el: $('#home') },
        { id: 'ccs-ms', el: $('#ccs-ms') },
        { id: 'gazette', el: $('#gazette') },
        { id: 'about', el: $('#about') },
        { id: 'enroll', el: $('#enroll') }
    ];

    function updateActiveNavLink() {
        var scrollPos = window.scrollY + 120;
        var currentSectionId = 'home';

        trackedSections.forEach(function (sec) {
            if (sec.el && sec.el.offsetTop <= scrollPos) {
                currentSectionId = sec.id;
            }
        });

        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 20) {
            currentSectionId = 'enroll';
        }

        sectionLinks.forEach(function (link) {
            if (link.classList.contains('btn-enroll')) {
                return;
            }
            var href = link.getAttribute('href');
            if (href === '#' + currentSectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update Mobile Bottom Bar active state
        if (mobileBarItems.length > 0) {
            mobileBarItems.forEach(function (mItem) {
                var target = mItem.getAttribute('data-target');
                if (target === currentSectionId) {
                    mItem.classList.add('active');
                } else {
                    mItem.classList.remove('active');
                }
            });
        }

        // Toggle Floating Back to Top Button visibility
        if (backToTopBtn) {
            if (window.scrollY > 350) {
                backToTopBtn.classList.add('is-visible');
            } else {
                backToTopBtn.classList.remove('is-visible');
            }
        }
    }

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });
    updateActiveNavLink();

    // Gazette Category Filtering
    var filterButtons = $$('.filter-btn');
    var storyCards = $$('.story-card');

    filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterButtons.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');

            var filterValue = btn.getAttribute('data-filter');

            storyCards.forEach(function (card) {
                var cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('is-hidden');
                } else {
                    card.classList.add('is-hidden');
                }
            });
        });
    });

    // UI Video Modal Controls
    var videoModal = $('#videoModal');
    var modalTrigger = $('#modalVideoTrigger');
    var modalCloseBtn = $('#modalCloseBtn');
    var modalCloseActionBtn = $('#modalCloseActionBtn');
    var modalBackdrop = $('#modalBackdrop');

    function openVideoModal() {
        if (videoModal) {
            videoModal.removeAttribute('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeVideoModal() {
        if (videoModal) {
            videoModal.setAttribute('hidden', '');
            document.body.style.overflow = '';
        }
    }

    if (modalTrigger) modalTrigger.addEventListener('click', openVideoModal);
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeVideoModal);
    if (modalCloseActionBtn) modalCloseActionBtn.addEventListener('click', closeVideoModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeVideoModal);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && videoModal && !videoModal.hasAttribute('hidden')) {
            closeVideoModal();
        }
    });

    // Metric Animated Counters
    var counterElements = $$('[data-counter]');
    if ('IntersectionObserver' in window && counterElements.length > 0) {
        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var targetValue = parseInt(el.getAttribute('data-counter'), 10);
                    if (!isNaN(targetValue)) {
                        animateCount(el, targetValue);
                    }
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.2 });

        counterElements.forEach(function (el) {
            counterObserver.observe(el);
        });
    }

    function animateCount(element, target) {
        var startTime = null;
        var duration = 1400;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var current = Math.floor(progress * target);
            if (element.getAttribute('data-counter') === '100') {
                element.textContent = current + '%';
            } else {
                element.textContent = current + '+';
            }
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    }

    // Enrollment Form Validation & Submission
    var enrollmentForm = $('#enrollmentForm');
    var formSuccessAlert = $('#formSuccessAlert');
    var successNoticeText = $('#successNoticeText');

    if (enrollmentForm) {
        var studentType = $('#studentType');
        var fullName = $('#fullName');
        var emailAddr = $('#emailAddr');
        var contactNo = $('#contactNo');
        var chosenProgram = $('#chosenProgram');

        function setFieldError(field, errorElId, message) {
            var errEl = $('#' + errorElId);
            if (message) {
                field.classList.add('has-error');
                if (errEl) errEl.textContent = message;
                return false;
            } else {
                field.classList.remove('has-error');
                if (errEl) errEl.textContent = '';
                return true;
            }
        }

        // Realtime input clearing
        if (studentType) studentType.addEventListener('change', function () {
            setFieldError(studentType, 'err-studentType', studentType.value ? '' : 'Please select a student classification.');
        });
        if (fullName) fullName.addEventListener('input', function () {
            setFieldError(fullName, 'err-fullName', fullName.value.trim().length >= 2 ? '' : 'Please enter your full name.');
        });
        if (emailAddr) emailAddr.addEventListener('input', function () {
            var isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddr.value.trim());
            setFieldError(emailAddr, 'err-emailAddr', isValidEmail ? '' : 'Please enter a valid email address.');
        });
        if (contactNo) contactNo.addEventListener('input', function () {
            setFieldError(contactNo, 'err-contactNo', contactNo.value.trim().length >= 7 ? '' : 'Please enter a valid contact number.');
        });
        if (chosenProgram) chosenProgram.addEventListener('change', function () {
            setFieldError(chosenProgram, 'err-chosenProgram', chosenProgram.value ? '' : 'Please select an academic program.');
        });

        enrollmentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var isValid = true;

            if (!studentType.value) {
                isValid = setFieldError(studentType, 'err-studentType', 'Please select a student classification.') && isValid;
            }
            if (fullName.value.trim().length < 2) {
                isValid = setFieldError(fullName, 'err-fullName', 'Please enter your full name.') && isValid;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddr.value.trim())) {
                isValid = setFieldError(emailAddr, 'err-emailAddr', 'Please enter a valid email address.') && isValid;
            }
            if (contactNo.value.trim().length < 7) {
                isValid = setFieldError(contactNo, 'err-contactNo', 'Please enter a valid contact number.') && isValid;
            }
            if (!chosenProgram.value) {
                isValid = setFieldError(chosenProgram, 'err-chosenProgram', 'Please select an academic program.') && isValid;
            }

            if (!isValid) {
                if (formSuccessAlert) formSuccessAlert.hidden = true;
                return;
            }

            // Success feedback
            var studentName = fullName.value.trim();
            var progName = chosenProgram.options[chosenProgram.selectedIndex].text;
            if (formSuccessAlert && successNoticeText) {
                successNoticeText.textContent = 'Thank you, ' + studentName + '! Your enrollment pre-registration for ' + progName + ' has been logged. An academic adviser from the College of Computer Studies will review your records.';
                formSuccessAlert.hidden = false;
                formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }

            enrollmentForm.reset();
        });
    }
})();