import React from 'react'

function Items(props){
	const filtered = props.filtered;
	const onRemove = props.onRemove
	const currentCols = props.currentCols

	const column = {
    	fontSize : "16px",
    	color : "#292929",
    	padding : "6px",
    	textAlign : "left",
    	borderLeft : "1px solid #292929",
    	borderBottom : "1px dotted #292929 "
  	}
	return(
		<>
		{ filtered.lenght != 0 ? currentCols.map((item) => {
            return (<div key={item.id} className="row">
              <div style={column} className="col">{item.id}</div>
              <div style={column} className="col">{item.domain}</div>
              <div style={column} className="col">{item.amount}</div>
              <div style={column} className="col">{item.distance} метров</div>
              <div style={column} className="col">{item.date}</div>
              <div style={column} className="col-1">

              <button onClick={() => {onRemove(item.id)}} type="default" class="btn btn-default">

                  <svg width="1.4em" height="1.4em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>

              </button>

              </div>
            </div>)
          })
        : <div></div>}
        </>
		)
}
export default Items