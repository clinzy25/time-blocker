## View at: https://time-blocker.netlify.app/login

## Issues

- Limit blockSize lower limit to height of tasks in cell
- Upper padding of tasks that dont start at the start time of the block. Ie. a 930-1000 task in a 900-1000 cell should fill the SECOND 50% of the block.
- Resizing tasks should change the start / end time of the task
- Task text only pushes to local storage after another task is added, need to trigger the re-render on submit.
- Hovering over cell with expanded task should not show add task btn
- Most inputs need debouncing
- Local storage defaults wrong
- Shift days bug

## Todo:

- Refactor all
- Responsive tweaks
- Limit block intervals to 10, 20, 30, 60, 90, and 120 min.
- Current time always on top button.
- Resize
- Drag and drop
- Accessibility controls

## Lesser todo:

- User can customize colors of cells and columns
- Task Search
- Task tagging

### Beyond

- Google calandar import
