<?php

namespace en2portr3s\admin\model;

class Person extends Database {
    
    private $id;
    private $first_name;
    private $last_name;
    private $email;
    private $phone;
    private $address;
    private $birthdate;

    function __construct() {
        $this->db_name = "en2portr3s";
    }

    public function get($email = '') {
        if ($email != '') {
            $this->query = "SELECT * FROM person WHERE email = '$email'";
            $this->dql();
        }
        if (count($this->rows) === 1) {
            $this->synchronize($this->rows[0]);
            $this->message = 'Persona encontrada';
        } else {
            $this->message = 'Persona no encontrada';
        }
    }

    public function set($user_data) {
        if (array_key_exists('email', $user_data)) {
            $this->get($user_data['email']);
            if ($user_data['email'] != $this->email) {
                $this->synchronize($user_data);
                $this->query = "
                    INSERT INTO person(first_name, last_name, email, phone, address, birthdate)
                    VALUES('$this->first_name', '$this->last_name', '$this->email', '$this->phone', '$this->address','$this->birthdate')
                ";
                $this->dml();
                $this->message = 'Persona agregada exitosamente';
            } else {
                $this->message = 'La persona ya existe';
            }
        } else {
            $this->message = 'No se ha agregado a la persona';
        }
    }

    public function edit($user_data = []) {
        $this->synchronize($user_data);
        $this->query = "
            UPDATE person
            SET first_name='$this->first_name',
                last_name='$this->last_name',
                email='$this->email',
                phone='$this->phone',
                address='$this->address',
                birthdate='$this->birthdate'
            WHERE email = '$this->email'
        ";
        $this->dml();
        $this->message = 'Información personal modificada';
    }

    public function delete($email = '') {
        $this->query = "
            DELETE FROM person
            WHERE email = '$email'
        ";
        $this->dml();
        $this->message = 'Información personal eliminada';
    }

    public function getId($email = '') {
        if ($email !== '') {
            $this->get($email);
        }
        return $this->id;
    }

    /**
     * Sincroniza los datos de la clase con la tabla en la base de datos.
     */
    private function synchronize($data) {
        foreach ($data as $propiedad => $valor) {
            $this->$propiedad = $valor;
        }
    }

}