/**
 * create file resource
 * PQ Huy 02.06.2021
 */

var resource = resource || {};

// Data type in grid
resource.DataTypeColumn = {
    Number: "Number",
    Date: "Date",
    Enum: "Enum"
}

// Model action with api
resource.Method = {
    Get: "Get",
    Post: "Post",
    Put: "Put",
    Delete: "Delete"
}

// Grender
resource.Grender = {
    Female: "Nữ",
    Male: "Nam",
    Other: "Khác"
}

// Command type
resource.CommandType = {
    Add: "Add",
    Edit: "Edit",
    Delete: "Delete",
    Refresh: "Refresh",
    Import: "Import",
    Export: "Export"
}

// Command form
resource.CommandForm = {
    Save: "Save",
    Cancel: "Cancel",
}