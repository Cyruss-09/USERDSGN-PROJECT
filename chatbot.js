/**
 * Trimex Connect - CCS Assistant (rule-based chatbot, no backend needed)
 * Injects its own HTML, so index.html only needs the CSS and JS includes.
 */
(function () {
    'use strict';

    // ---------- Knowledge base ----------
    // `keys` are matched against the user's message; the most matches wins.
    // `reply` is trusted HTML written here (user input is never inserted as HTML).
    var LINK = function (url, label) {
        return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + label + '</a>';
    };

    var KB = [
        {
            id: 'greeting',
            keys: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'kumusta'],
            reply: 'Hi! I\'m the CCS Assistant. I can point you to the CCS-MS systems, the Gazette, enrollment info, and more. What do you need?'
        },
        {
            id: 'ccsms',
            keys: ['ccs-ms', 'ccsms', 'systems', 'platforms', 'modules', 'portal', 'services', 'management system'],
            reply: 'CCS-MS has these platforms:<ul>' +
                '<li>' + LINK('https://trimexconnect.com/capstonethesis/', 'Research Management (Capstone)') + '</li>' +
                '<li>' + LINK('https://coderkiosk.com', 'CoderKiosk online compiler') + '</li>' +
                '<li>' + LINK('https://trimexconnect.com/academy/netsec/', 'Cybersecurity Arena') + '</li>' +
                '<li>' + LINK('https://trimexconnect.com/iskuling/lms/', 'CCS LMS') + '</li>' +
                '<li>' + LINK('https://trimexconnect.com/voting/acts/', 'ACTS Voting System') + '</li>' +
                '<li>' + LINK('https://trimexconnect.com/ojtms', 'OJT Monitoring') + '</li></ul>' +
                'See them all in the <a href="#ccs-ms">CCS-MS section</a>.'
        },
        {
            id: 'research',
            keys: ['research', 'capstone', 'thesis', 'manuscript', 'defense', 'manual', 'proposal'],
            reply: 'For capstone and thesis work, use ' + LINK('https://trimexconnect.com/capstonethesis/', 'Research Management') +
                ' to submit proposals and manuscripts. The ' + LINK('https://trimexconnect.com/researchmanual/', 'Official Research Manual') + ' explains the format and process.'
        },
        {
            id: 'compiler',
            keys: ['compiler', 'coderkiosk', 'code', 'programming', 'coding', 'laboratory', 'lab exercise'],
            reply: LINK('https://coderkiosk.com', 'CoderKiosk') + ' is the browser-based compiler for programming lab work. You can write and run code without installing anything.'
        },
        {
            id: 'security',
            keys: ['cyber', 'security', 'netsec', 'hacking', 'hack', 'range', 'infosec', 'ctf', 'arena'],
            reply: 'Security students have three options:<ul>' +
                '<li>' + LINK('https://trimexconnect.com/academy/netsec/', 'Cybersecurity Arena') + '</li>' +
                '<li>' + LINK('https://trimexconnect.com/e-hack/', 'Educational Cyber Range') + '</li>' +
                '<li>' + LINK('https://trimexconnect.com/dikoalam/infosec/', 'Cybersecurity Training Lab') + '</li></ul>'
        },
        {
            id: 'lms',
            keys: ['lms', 'learning', 'lesson', 'lecture', 'syllabus', 'grades', 'grading', 'module'],
            reply: 'Lectures, lab exercises, and grading submissions are in the ' + LINK('https://trimexconnect.com/iskuling/lms/', 'CCS LMS') + '.'
        },
        {
            id: 'data',
            keys: ['data science', 'e-data', 'data', 'analytics'],
            reply: 'The ' + LINK('https://trimexconnect.com/e-data/', 'Data Science Platform') + ' is part of CCS-MS.'
        },
        {
            id: 'voting',
            keys: ['vote', 'voting', 'election', 'acts', 'acse', 'poll', 'student council', 'officers'],
            reply: 'Student elections run on the ' + LINK('https://trimexconnect.com/voting/acts/', 'ACTS Voting System') +
                '. ACSE polls are at the ' + LINK('https://trimexconnect.com/voting/acse/', 'ACSE Portal') + '.'
        },
        {
            id: 'ojt',
            keys: ['ojt', 'internship', 'intern', 'practicum', 'hours', 'portfolio', '201'],
            reply: 'Log intern hours and company evaluations in ' + LINK('https://trimexconnect.com/ojtms', 'OJTMS') +
                '. Your ' + LINK('https://trimexconnect.com/201ccs', 'CCS 201 Portfolio') + ' is separate.'
        },
        {
            id: 'gazette',
            keys: ['gazette', 'news', 'article', 'articles', 'publication', 'announcement', 'announcements', 'stories', 'volume'],
            reply: 'The CCS Gazette is the college publication. ' + LINK('https://trimexconnect.com/ccs/gazette/', 'Vol. 1') +
                ' is out now and Vol. 2 is in press. Read the latest stories in the <a href="#gazette">Gazette section</a>.'
        },
        {
            id: 'enroll',
            keys: ['enroll', 'enrol', 'enrollment', 'enrolment', 'admission', 'admissions', 'apply', 'application', 'register', 'registration', 'freshman', 'freshmen', 'transferee', 'transfer', 'new student', 'registrar'],
            reply: 'You can start with the <a href="#enroll">enrollment form</a> on this page, choosing New, Continuing, Transferee, or Second Degree. For official document assessment, go to the ' +
                LINK('https://www.trimexcolleges.edu.ph/online-enrollment', 'Trimex Official Online Enrollment') + '.'
        },
        {
            id: 'programs',
            keys: ['program', 'programs', 'course', 'courses', 'degree', 'bsit', 'bscs', 'bsis', 'act', 'information technology', 'computer science', 'information systems', 'associate'],
            reply: 'CCS offers:<ul>' +
                '<li>BS Information Technology (BSIT)</li>' +
                '<li>BS Computer Science (BSCS)</li>' +
                '<li>BS Information Systems (BSIS)</li>' +
                '<li>Associate in Computer Technology (ACT)</li></ul>' +
                'Pick one in the <a href="#enroll">enrollment form</a>.'
        },
        {
            id: 'schedule',
            keys: ['schedule', 'shift', 'day', 'evening', 'weekend', 'working student', 'class time'],
            reply: 'Class schedules available on the form are Day Shift, Evening Shift (for working students), and Weekend Hybrid.'
        },
        {
            id: 'location',
            keys: ['where', 'location', 'address', 'campus', 'located', 'laguna', 'binan', 'biñan'],
            reply: 'Trimex Colleges is in Biñan City, Laguna, Philippines. More info at the ' + LINK('https://www.trimexcolleges.edu.ph', 'Trimex Colleges website') + '.'
        },
        {
            id: 'about',
            keys: ['about', 'designer', 'developer', 'who made', 'made by', 'creator', 'author', 'adviser', 'professor', 'project', 'sanchez'],
            reply: 'This site is a front-end laboratory project for Mobile and Web Development, designed by Mark Cyruss L. Sanchez (BSIT) under Dr. Louie Agustin. See the <a href="#about">About section</a>.'
        },
        {
            id: 'help',
            keys: ['help', 'what can you do', 'options', 'menu', 'topics'],
            reply: 'I can help with CCS-MS systems, research and capstone, the Gazette, enrollment, programs, OJT, and voting. Tap a suggestion below or type your question.'
        },
        {
            id: 'thanks',
            keys: ['thanks', 'thank you', 'salamat', 'ty'],
            reply: 'You\'re welcome! Ask me anything else about Trimex Connect.'
        },
        {
            id: 'bye',
            keys: ['bye', 'goodbye', 'see you'],
            reply: 'Goodbye! Good luck with your studies.'
        }
    ];

    var FALLBACK = 'I\'m not sure about that one. Try asking about CCS-MS, enrollment, programs, the Gazette, OJT, or voting. For anything official, contact the ' +
        LINK('https://www.trimexcolleges.edu.ph', 'Trimex Colleges website') + '.';

    var CHIPS = [
        { label: 'How do I enroll?', q: 'How do I enroll?' },
        { label: 'CCS-MS systems', q: 'What are the CCS-MS systems?' },
        { label: 'Programs offered', q: 'What programs are offered?' },
        { label: 'Capstone / research', q: 'Where do I submit my capstone?' },
        { label: 'OJT', q: 'Where do I log my OJT hours?' }
    ];

    // ---------- Matching ----------
    function normalize(text) {
        return ' ' + text.toLowerCase().replace(/[^a-z0-9ñ\- ]+/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
    }

    function findReply(input) {
        var text = normalize(input);
        var best = null;
        var bestScore = 0;

        KB.forEach(function (entry) {
            var score = 0;
            entry.keys.forEach(function (key) {
                // whole-word match so "act" doesn't fire inside "contact"
                if (text.indexOf(' ' + key + ' ') !== -1) {
                    score += key.split(' ').length; // multi-word keys weigh more
                }
            });
            if (score > bestScore) {
                bestScore = score;
                best = entry;
            }
        });

        return best ? best.reply : FALLBACK;
    }

    // ---------- UI ----------
    var launcher, panel, body, form, input, chipsWrap;
    var greeted = false;

    function build() {
        launcher = document.createElement('button');
        launcher.type = 'button';
        launcher.className = 'ccs-chat-launcher';
        launcher.setAttribute('aria-expanded', 'false');
        launcher.setAttribute('aria-controls', 'ccsChatPanel');
        launcher.innerHTML =
            '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
            '<span>Ask CCS</span>';

        panel = document.createElement('section');
        panel.id = 'ccsChatPanel';
        panel.className = 'ccs-chat-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'CCS Assistant chat');
        panel.innerHTML =
            '<header class="ccs-chat-header">' +
            '<div class="ccs-chat-avatar" aria-hidden="true">CCS</div>' +
            '<div class="ccs-chat-title"><strong>CCS Assistant</strong><span>Trimex Connect help</span></div>' +
            '<button type="button" class="ccs-chat-close" aria-label="Close chat">&times;</button>' +
            '</header>' +
            '<div class="ccs-chat-body" role="log" aria-live="polite"></div>' +
            '<div class="ccs-chips"></div>' +
            '<form class="ccs-chat-form" autocomplete="off">' +
            '<input type="text" class="ccs-chat-input" placeholder="Type your question..." aria-label="Type your question" maxlength="200">' +
            '<button type="submit" class="ccs-chat-send" aria-label="Send message">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
            '</button></form>';

        document.body.appendChild(launcher);
        document.body.appendChild(panel);

        body = panel.querySelector('.ccs-chat-body');
        form = panel.querySelector('.ccs-chat-form');
        input = panel.querySelector('.ccs-chat-input');
        chipsWrap = panel.querySelector('.ccs-chips');

        CHIPS.forEach(function (c) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'ccs-chip';
            b.textContent = c.label;
            b.addEventListener('click', function () { send(c.q); });
            chipsWrap.appendChild(b);
        });

        launcher.addEventListener('click', function () {
            panel.classList.contains('is-open') ? closeChat() : openChat();
        });
        panel.querySelector('.ccs-chat-close').addEventListener('click', closeChat);

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var value = input.value.trim();
            if (value) send(value);
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && panel.classList.contains('is-open')) closeChat();
        });

        // Links inside bot replies: close the chat on in-page anchors (helps on mobile)
        body.addEventListener('click', function (e) {
            var a = e.target.closest('a[href^="#"]');
            if (a) closeChat();
        });
    }

    function openChat() {
        panel.classList.add('is-open');
        launcher.setAttribute('aria-expanded', 'true');
        if (!greeted) {
            greeted = true;
            addMessage('bot', 'Hi! I\'m the CCS Assistant for Trimex Connect. Ask me about enrollment, CCS-MS systems, the Gazette, and more.', true);
        }
        setTimeout(function () { input.focus(); }, 250);
    }

    function closeChat() {
        panel.classList.remove('is-open');
        launcher.setAttribute('aria-expanded', 'false');
        launcher.focus();
    }

    function addMessage(who, content, isHTML) {
        var el = document.createElement('div');
        el.className = 'ccs-msg ' + who;
        if (isHTML) {
            el.innerHTML = content; // only trusted KB strings reach here
        } else {
            el.textContent = content; // user text is never parsed as HTML
        }
        body.appendChild(el);
        body.scrollTop = body.scrollHeight;
        return el;
    }

    function send(text) {
        addMessage('user', text, false);
        input.value = '';

        var typing = document.createElement('div');
        typing.className = 'ccs-msg bot';
        typing.innerHTML = '<span class="ccs-typing" aria-label="Assistant is typing"><span></span><span></span><span></span></span>';
        body.appendChild(typing);
        body.scrollTop = body.scrollHeight;

        setTimeout(function () {
            body.removeChild(typing);
            addMessage('bot', findReply(text), true);
        }, 450 + Math.random() * 350);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', build);
    } else {
        build();
    }
})();