<?php

if($_SERVER['REQUEST_METHOD'] == 'POST'){
$mode = $_REQUEST['mode'];
$total = $_REQUEST['total'];
$tax = $_REQUEST['tax'];
$customerName = $_REQUEST['name'];
$customerPhone = $_REQUEST['phone'];
$customerWhatsapp = $_REQUEST['whatsapp'];
$customerEmail = $_REQUEST['email'];
$address = $_REQUEST['address'];
$order_note = $_REQUEST['order_note'];

// results
$name = [];

foreach (array_combine($_REQUEST['idname'], $_REQUEST['qt']) as $value => $value1) {
        $name[] = $value. '*X' . $value1 .'* %0A';
}
$data = implode(' ' , $name);
// echo json_encode($data);

// $json_file = json_encode($_REQUEST);

echo json_encode('*_Delivery_ Order* From _'. $customerName .'_ %0A'.
'******************************** %0A' .
'*ORDERED ITEMS :* %0A ' .
$data .
'********************************' . "%0A" .
'Order Amount QAR *'. $total .'* ' . "%0A" .
'Delivery Fee = *0.00* ' . "%0A" .
'Tax(0%) = QAR *'. $tax .'* '."%0A".
'Amount Payable = QAR *'. $total .'*' . "%0A" .
'*********************************'. "%0A".
'*Name :* '. $customerName .  "%0A" .
'*Phone :* '. $customerPhone ."%0A".
'*Whatsaap :* '. $customerWhatsapp."%0A".
'*Email :* '. $customerEmail."%0A".
'*Address :* ' .$address."%0A".
'*Order Note :* '.$order_note);
exit;
}

?>