## Code Structure
- separate front-end and backend; host on S3 or Dockerized nginx;
  helps keep code clarity
- I personally prefer to group by feature, not by function but that is a
  preference thing
- I also prefer having specs in the same folder as code to keep everything in
  one place
- Moar helper libs (redux-actions; reselect etc);
- React and D3 aren't immediately combindable; they both attempt to control the
  DOM in a direct manner and this can cause confusion if someone looks at the D3
  docs. Is there are hard demand for D3? Or is it just something your investigating
-
