## Issues

1. Button hover effect re-renders entire table. Possible fix: https://www.npmjs.com/package/react-grid-area
2. possible issue with task text, might show when I try to persist data
3. adding multiple tasks to the same slot

## Todo:

1. Tasks have a reference to the time block the user initially specified. If the user resizes the blocks or the table, the tasks remain in the correct position, and resize.
   - I.e. an hour long time block from 9 - 10. If the user increases the block interval to 2 hours, the block should take up half of the new 9 - 11 block (easy)
   - an hour long time block from 9 - 10. If the user decreases the block interval to 30 minutes, the block should take up 2 cells. 9 - 930 and 930 - 10. (hardddd)
   - Might need a resize blocks button, that shrinks / expands blocks to fit a new config.Otherwise the user might have to go around resizing everything manually
5. Change size of cells (easy)
6. Finish cell formatting
7. Resize and drag and drop cells


## Lesser todo:

1. User can customize colors of cells and columns
2. Add current date to date column
3. App is already aware of current time, add faded affect for past time blocks and days, highlight current.
