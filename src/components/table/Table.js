import React from 'react';
import { tbody,Table } from 'reactstrap';
import * as Icon from 'react-feather';

const customTable = (props) => {
    return (
        <Table dark hover>
            <thead>
                <tr>
                    <th><Icon.Square /></th>
                    <th>First Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>            
            <tbody>
           
                <tr>
                    <th scope="row"><Icon.Square /></th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>
                        <Icon.Edit style={{ marginRight: '8px' }} /><Icon.Trash2 />
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}

export default customTable;

