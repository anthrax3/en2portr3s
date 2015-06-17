<?php

namespace en2portr3s\admin\model;

class Account extends Database {

    private $id;
    private $username;
    private $pass;
    private $kind;
    private $since;
    private $person_id;

    function __construct() {
        $this->db_name = "en2portr3s";
    }

    public function get($username = '') {
        if ($username != '') {
            $this->query = "SELECT * FROM account WHERE username = '$username'";
            $this->dql();
        }
        if (count($this->rows) === 1) {
            $this->synchronize($this->rows[0]);
            $this->message = 'Usuario encontrado';
        } else {
            $this->message = 'Usuario no encontrado';
        }
    }

    public function set($register_data) {
        if (array_key_exists('username', $register_data)) {
            $this->get($register_data['username']);
            if ($register_data['username'] != $this->username) {
                $this->synchronize($register_data);
                $this->query = "
                    INSERT INTO account(username, pass, kind, person_id)
                    VALUES('$this->username', '$this->pass', '$this->kind', '$this->person_id')
                ";
                $this->dml();
                $this->message = 'Registro exitoso';
            } else {
                $this->message = 'El usuario ya existe';
            }
        } else {
            $this->message = 'No se ha registrado al usuario';
        }
    }

    public function edit($register_data = []) {
        $this->synchronize($register_data);
        $this->query = "
            UPDATE account
            SET username='$this->username',
                pass='$this->pass',
                kind='$this->kind',
                person_id='$this->person_id'
            WHERE username = '$this->username'
        ";
        $this->dml();
        $this->message = 'Usuario modificado';
    }

    public function delete($username = '') {
        $this->query = "
            DELETE FROM account
            WHERE username = '$username'
        ";
        $this->dml();
        $this->message = 'Usuario eliminado';
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