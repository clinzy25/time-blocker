## View at: https://time-blocker.netlify.app/login

## Issues

1. Limit blockSize lower limit to height of tasks in cell
2. Upper padding of tasks that dont start at the start time of the block. Ie. a 930-1000 task in a 900-1000 cell should fill the SECOND 50% of the block.
3. Resizing tasks should change the start / end time of the task
4. Task text only pushes to local storage after another task is added, need to trigger the re-render on submit.
5. Hovering over cell with expanded task should not show add task btn

## Todo:

1. Refactor all
1. Responsive tweaks
2. Resize
3. Drag and drop
4. Faded affect for past time blocks and days, highlight current.
5. Accessibility controls

## Lesser todo:

1. User can customize colors of cells and columns
3. Task Search
4. Task tagging

### Beyond
1. Google calandar import
2. Task complete btn, store times and view metrics, user can see how long a task normally takse them