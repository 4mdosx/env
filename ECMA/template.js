var template = `
echo('<ul>');
for(var i=0; i < data.supplies.length; i++) {
  echo('<li>');
  echo(data.supplies[i]);
  echo('</li>');
};
echo('</ul>');`

function echo(data){
   console.log(data)
}

${template}