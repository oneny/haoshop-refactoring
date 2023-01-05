const publicURL = (filename: string): string => {
  return `http://localhost:8000/public/${filename}`;
  // return process.env.NODE_ENV === 'production'
  //   ? `/public/${filename}`
  //   : 
};

export default publicURL;