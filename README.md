## View at: https://time-blocker.netlify.app/

## Issues

- Auth0 user data storage
- Upper padding of tasks that dont start at the start time of the block. Ie. a 930-1000 task in a 900-1000 cell should fill the _second_ 50% of the block.
- Hovering over cell with expanded task should not show add task btn
- Most inputs need debouncing
- Cant add to last cell
- Table controls should be sticky and accessible from anywhere on the page
- Current time on top bug when time column isn't set correctly. Should set start time to current time when checked.
- 'Clear Table' buttons are ugly
- 'Shift days' should go forward and backwards, and should be moved somewhere else'

## Todo:

- Mobile view
  - Task mobile css
  - Some way to quickly zoom out and get the big picture of the week / day.
  - A way to quickly navigate between days without scrolling a lot.
  - Header colors
- Mark Task complete
- Notifications
- Resize
- Drag and drop
- Accessibility controls
  - Light / dark mode
  - Change font sizes
  - Keyboard shortcuts
  - Tooltips: https://popper.js.org/
  - 'How to' section.
  - Time blocking guide

## Lesser todo:

- A 'work on next week' button that displays the next week. This should evolove into a infinite foreward and backward looking calandar type of thing, where past tasks are permanently stored and visible
- Store user data with Firebase
- User can customize colors of cells and columns
- Task Search
- Task tagging
- Task modal view with detailed text editing

### Beyond

- Google calandar import
- Misc todo list with timeless tasks
- React Native
- Watch Support
