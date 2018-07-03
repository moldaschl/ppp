import Card from '@material-ui/core/Card'
import Icon from '@material-ui/core/Icon'
import SvgIcon from '@material-ui/core/SvgIcon'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

class Item extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.state.edit = false
    this.state.team = props.item.data.team
    this.state.text = props.item.data.text
    this.toggleEdit = this.toggleEdit.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    let state = {}
    state[e.target.name]=e.target.value
    this.setState(state)
  }

  onSave() {
    let item= {
      team: this.state.team,
      text: this.state.text,
      type: this.props.item.data.type
    }
    this.props.item.onSave(item).then(() => this.setState({edit: false}))
  }

  toggleEdit () {
    this.setState({edit: !this.state.edit})
  }

  render () {
    return (
      <ListItem key={this.props.item.key}>
        {!this.state.edit &&
        <ListItemText
          primary={this.props.item.data.text}
          secondary={this.props.item.data.team}
        />
        }
        {this.state.edit &&
        <div>
          <TextField name="team" label="team" defaultValue={this.props.item.data.team} onChange={this.onChange}/>
          <TextField name="text" label="text" defaultValue={this.props.item.data.text} onChange={this.onChange}/>
        </div>
        }

        {!this.state.edit &&
        <IconButton size="small" onClick={this.toggleEdit}>
          <SvgIcon>
            <path fill="#000000"
                  d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
          </SvgIcon>
        </IconButton>
        }
        {this.state.edit &&
        <IconButton size="small" onClick={this.onSave}>
          <SvgIcon>
            <path fill="#000000" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
          </SvgIcon>
        </IconButton>
        }


      </ListItem>
    )
  }

}

let Group = (props) => (
  <Card style={{position:'relative', flex: 1, minWidth: 300, margin: 10}}><CardContent>
    <Typography variant="title">{props.heading}</Typography>
    <Button onClick={props.onNewItem} style={{position:'absolute', right: 10, top: 10}} variant="fab" color="secondary" mini="true">
      <AddIcon/>
    </Button>
    <List dense={true}>
      {props.items.map(i =>
        <Item item={i} />
      )}
    </List>
  </CardContent></Card>
)

export default Group